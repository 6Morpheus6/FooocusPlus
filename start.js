module.exports = {
  daemon: true,
  run: [{
    method: "shell.run",
    params: {
      venv: "env",
      path: "app",
      message: "python launch.py {{input.flags}}",
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
