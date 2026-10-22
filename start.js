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
    when: "{{platform === 'darwin'}}",
    method: "shell.run",
    params: {
      venv: "env",
      path: "app",
      message: "DYLD_LIBRARY_PATH=\"$(echo ./env/lib/python*/site-packages/torch/lib)\" python entry_with_update.py --gpu-type none {{args.flags}} --language {{local.lang.language}}",
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
    when: "{{platform !== 'darwin'}}",
    method: "shell.run",
    params: {
      venv: "env",
      path: "app",
      message: `python entry_with_update.py --gpu-type none {{args.flags}} --language {{local.lang.language}}`,
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