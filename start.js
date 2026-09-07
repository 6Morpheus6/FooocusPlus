module.exports = {
  requires: {
    bundle: "ai",
  },
  daemon: true,
  run: [{
    method: "shell.run",
    params: {
      venv: "env",
      path: "app",
      message: "python launch.py --gpu-type none {{input.flags}}",
      on: [{
        event: "/http:\/\/[0-9.:]+/",
        done: true
      }, {
        event: "/error:/i",
        break: false
      }]
    }
  }, {
    method: "local.set",
    params: {
      url: "{{input.event[0]}}"
    }
  }]
}
