module.exports = {
  run: [{
    method: "shell.run",
    params: {
      message: "git pull"
    }
/*   }, {
    method: "shell.run",
    params: {
      path: "app",
      message: "git fetch --all"
    }
  }, {
    method: "shell.run",
    params: {
      path: "app",
      message: "git reset --hard"
    } */
  }, {
    method: "shell.run",
    params: {
      path: "app",
      message: "git pull"
    }
  }, {
    method: "shell.run",
    params: {
      venv: "env",
      path: "app",
      message: "uv pip install -r ../requirements_versions.txt --index-strategy unsafe-best-match"
    }
  }]
}
