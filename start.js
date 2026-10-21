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
      // Use args.flags (not input.flags): input is overwritten by the json.get/json.set
      // steps above, while args always holds the params passed in from pinokio.js
      message: "{{platform === 'darwin' ? 'DYLD_LIBRARY_PATH=$(echo ./env/lib/python*/site-packages/torch/lib) ' : 'python entry_with_update.py --gpu-type none {{args.flags}} --language {{local.lang.language}}'}}",
      on: [{
        event: "/(http:\\/\\/[0-9.:]+)/",
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
      url: "{{input.event[1]}}"
    }
  }]
}
