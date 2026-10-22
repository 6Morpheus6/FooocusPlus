module.exports = {
  requires: {
    bundle: "ai",
  },
  daemon: true,
  run: [{
    // If no language has been selected yet (e.g. existing installs), default to English
    when: "{{!exists('language.json')}}",
    method: "json.set",
    params: {
      "language.json": {
        language: "en"
      }
    }
  }, {
    // Load the persisted language selection into local.lang
    method: "json.get",
    params: {
      lang: "language.json"
    }
  }, {
    method: "shell.run",
    params: {
      venv: "env",
      path: "app",
      // macOS-only DYLD prefix belongs in the step-level `env`, never inline in the
      // command: a shell-word-style {{platform === 'darwin' ? ... : ''}} expression must
      // resolve to a single template value before it reaches the shell. On Windows an
      // unresolved {{...}} block gets parsed as a command, which is why the whole
      // message (args.flags + local.lang) looked like it "wasn't filled".
      // Use args.flags (not input.flags): input is overwritten by the json.get/json.set
      // steps above, while args always holds the params passed in from pinokio.js
      env: (kernel) => (kernel.platform === "darwin" ? {
        DYLD_LIBRARY_PATH: "./env/lib/python*/site-packages/torch/lib"
      } : {}),
      message: `python entry_with_update.py --gpu-type none ${"{{args.flags}}"} --language ${"{{local.lang.language}}"}`,
      on: [{
        event: "/Comfy loading complete!/",
        done: true
      }, {
        event: "/errno/i",
        break: false
      }, {
        event: "/error:/i",
        break: false
      }]
    }
  }, {
    // Only set the url when the shell actually printed one (guarded, like the official examples)
    when: "{{input && input.event && Array.isArray(input.event) && input.event.length > 0}}",
    method: "local.set",
    params: {
      url: "http://127.0.0.1:7860"
    }
  }]
}