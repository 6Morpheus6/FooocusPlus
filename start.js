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
    method: "local.set",
    params: {
      port: "{{port}}"
    }
  }, {
    when: "{{platform === 'darwin'}}",
    method: "shell.run",
    params: {
      venv: "env",
      path: "app",
      message: "DYLD_LIBRARY_PATH=\"$(echo ./env/lib/python*/site-packages/torch/lib)\" python entry_with_update.py --gpu-type none {{args.flags}} --language {{local.lang.language}} --port {{local.port}}",
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
    },
    next: "url_set"
  }, {
    when: "{{platform !== 'darwin'}}",
    method: "shell.run",
    params: {
      venv: "env",
      path: "app",
      message: `python entry_with_update.py --gpu-type none {{args.flags}} --language {{local.lang.language}} --port {{local.port}}`,
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
    },
    next: "url_set"
  }, {
    // Only set the url when the shell actually printed one (guarded, like the official examples)
    id: "url_set",
    when: "{{input && input.event && Array.isArray(input.event) && input.event.length > 0}}",
    method: "local.set",
    params: {
      url: "http://127.0.0.1:{{local.port}}"
    }
  }]
}