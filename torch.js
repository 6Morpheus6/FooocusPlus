module.exports = {
  run: [
    // windows nvidia GTX10 / GTX16
    {
      "when": "{{platform === 'win32' && gpu === 'nvidia' && /gtx\\s*1[06]/i.test(gpu_model)}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": [
          "uv pip install torch==2.7.0 torchvision==0.22.0 torchaudio==2.7.0 {{args && args.xformers ? 'xformers==0.0.30' : ''}} --index-url https://download.pytorch.org/whl/cu128 --force-reinstall --no-deps",
          "uv pip install bitsandbytes==0.49.2"
        ]
      },
      "next": null
    },
    // windows nvidia RTX20
    {
      "when": "{{platform === 'win32' && gpu === 'nvidia' && gpu_target === 'sm_75' && /rtx\\s*20/i.test(gpu_model)}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": [
          "uv pip install torch==2.7.0 torchvision==0.22.0 torchaudio==2.7.0 {{args && args.xformers ? 'xformers==0.0.30' : ''}} --index-url https://download.pytorch.org/whl/cu128 --force-reinstall --no-deps",
          "uv pip install triton-windows==3.3.1.post19",
          "uv pip install bitsandbytes==0.49.2"
        ]
      },
      "next": null
    },
    // windows nvidia RTX30 - RTX40
    {
      "when": "{{platform === 'win32' && gpu === 'nvidia' && /^sm_(86|89|90)$/.test(gpu_target)}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": [
          "uv pip install torch==2.7.0 torchvision==0.22.0 torchaudio==2.7.0 {{args && args.xformers ? 'xformers==0.0.30' : ''}} --index-url https://download.pytorch.org/whl/cu128 --force-reinstall --no-deps",
          "uv pip install triton-windows==3.3.1.post19",
          "uv pip install bitsandbytes==0.49.2"
        ]
      },
      "next": null
    },
    // windows nvidia RTX50 - RTX60 PRO, DGX Spark
    {
      "when": "{{platform === 'win32' && gpu === 'nvidia' && /^sm_(120|121)$/.test(gpu_target)}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": [
          "uv pip install torch==2.10.0 torchvision==0.25.0 torchaudio==2.10.0 --index-url https://download.pytorch.org/whl/cu130 --force-reinstall --no-deps",
          "uv pip install bitsandbytes==0.48.0"
        ]
      },
      "next": null
    },
    // RDNA 1 (5000s)
    {
      "when": "{{platform === 'win32' && gpu === 'amd' && /^gfx101[012]$/.test(gpu_target)}}",
      "method": "shell.run",
      "params": {
        "bluefairy": "off",
        "env": { "UV_SKIP_WHEEL_FILENAME_CHECK": "1" },
        "venv_python": "{{args && args.venv_python ? args.venv_python : null}}",
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": "uv pip install --pre torch torchvision torchaudio --index-url https://rocm.nightlies.amd.com/v2-staging/gfx101X-dgpu --force-reinstall"
      },
      "next": null
    },
    // RDNA 2 (6000s)
    {
      "when": "{{platform === 'win32' && gpu === 'amd' && /^gfx103[0124]$/.test(gpu_target)}}",
      "method": "shell.run",
      "params": {
        "bluefairy": "off",
        "env": { "UV_SKIP_WHEEL_FILENAME_CHECK": "1" },
        "venv_python": "{{args && args.venv_python ? args.venv_python : null}}",
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": "uv pip install --pre torch torchvision torchaudio --index-url https://rocm.nightlies.amd.com/v2-staging/gfx103X-dgpu --force-reinstall"
      },
      "next": null
    },
    // RDNA 3 (7000/8000s)
    {
      "when": "{{platform === 'win32' && gpu === 'amd' && /^gfx110[012]$/.test(gpu_target)}}",
      "method": "shell.run",
      "params": {
        "bluefairy": "off",
        "env": { "UV_SKIP_WHEEL_FILENAME_CHECK": "1" },
        "venv_python": "{{args && args.venv_python ? args.venv_python : null}}",
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": "uv pip install --pre torch torchvision torchaudio --index-url https://rocm.nightlies.amd.com/v2-staging/gfx110X-all --force-reinstall"
      },
      "next": null
    },
    // RDNA 4 (9000s)
    {
      "when": "{{platform === 'win32' && gpu === 'amd' && /^gfx120[01]$/.test(gpu_target)}}",
      "method": "shell.run",
      "params": {
        "bluefairy": "off",
        "env": { "UV_SKIP_WHEEL_FILENAME_CHECK": "1" },
        "venv_python": "{{args && args.venv_python ? args.venv_python : null}}",
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": "uv pip install --pre torch torchvision torchaudio --index-url https://rocm.nightlies.amd.com/v2-staging/gfx120X-all --force-reinstall"
      },
      "next": null
    },
    // STRIX POINT (880M/890M / gfx1150)
    {
      "when": "{{platform === 'win32' && gpu === 'amd' && /^gfx1150$/.test(gpu_target)}}",
      "method": "shell.run",
      "params": {
        "bluefairy": "off",
        "env": { "UV_SKIP_WHEEL_FILENAME_CHECK": "1" },
        "venv_python": "{{args && args.venv_python ? args.venv_python : null}}",
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": "uv pip install --pre torch torchvision torchaudio --index-url https://rocm.nightlies.amd.com/v2-staging/gfx1150 --force-reinstall"
      },
      "next": null
    },
    // STRIX HALO (8060s / gfx1151)
    {
      "when": "{{platform === 'win32' && gpu === 'amd' && /^gfx1151$/.test(gpu_target)}}",
      "method": "shell.run",
      "params": {
        "bluefairy": "off",
        "env": { "UV_SKIP_WHEEL_FILENAME_CHECK": "1" },
        "venv_python": "{{args && args.venv_python ? args.venv_python : null}}",
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": "uv pip install --pre torch torchvision torchaudio --index-url https://rocm.nightlies.amd.com/v2-staging/gfx1151 --force-reinstall"
      },
      "next": null
    },
    // arm64 mac
    {
      "when": "{{platform === 'darwin' && arch === 'arm64'}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": [
          "uv pip install torch==2.10.0 torchvision==0.25.0 torchaudio==2.10.0 --force-reinstall --no-deps",
          "uv pip install bitsandbytes==0.49.2"
        ]
      },
      "next": null
    },
    // intel mac
    {
      "when": "{{platform === 'darwin' && arch !== 'arm64'}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": "uv pip install torch==2.2.2 torchvision==0.17.2 torchaudio==2.2.2 --index-url https://download.pytorch.org/whl/cpu --force-reinstall --no-deps"
      },
      "next": null
    },
    // linux nvidia GTX10 / GTX16
    {
      "when": "{{platform === 'linux' && gpu === 'nvidia' && /gtx\\s*1[06]/i.test(gpu_model)}}",
      "method": "shell.run",
      "params": {
        "bluefairy": "off",
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": [
          "uv pip install torch==2.7.0 torchvision==0.22.0 torchaudio==2.7.0 {{args && args.xformers ? 'xformers==0.0.30' : ''}} --index-url https://download.pytorch.org/whl/cu128 --force-reinstall",
          "uv pip install bitsandbytes==0.49.2"
        ]
      },
      "next": null
    },
    // linux nvidia RTX20
    {
      "when": "{{platform === 'linux' && gpu === 'nvidia' && gpu_target === 'sm_75' && /rtx\\s*20/i.test(gpu_model)}}",
      "method": "shell.run",
      "params": {
        "bluefairy": "off",
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": [
          "uv pip install torch==2.7.0 torchvision==0.22.0 torchaudio==2.7.0 {{args && args.xformers ? 'xformers==0.0.30' : ''}} --index-url https://download.pytorch.org/whl/cu128 --force-reinstall",
          "uv pip install bitsandbytes==0.49.2"
        ]
      },
      "next": null
    },
    // linux nvidia RTX30 - RTX40
    {
      "when": "{{gpu === 'nvidia' && platform === 'linux' && /^sm_(86|89|90)$/.test(gpu_target)}}",
      "method": "shell.run",
      "params": {
        "bluefairy": "off",
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": [
          "uv pip install torch==2.7.0 torchvision==0.22.0 torchaudio==2.7.0 {{args && args.xformers ? 'xformers==0.0.30' : ''}} --index-url https://download.pytorch.org/whl/cu128 --force-reinstall",
          "uv pip install bitsandbytes==0.49.2"
        ]
      },
      "next": null
    },
    // linux nvidia RTX50 - RTX60 PRO, DGX Spark
    {
      "when": "{{gpu === 'nvidia' && platform === 'linux' && /^sm_(120|121)$/.test(gpu_target)}}",
      "method": "shell.run",
      "params": {
        "bluefairy": "off",
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": [
          "uv pip install torch==2.10.0 torchvision==0.25.0 torchaudio==2.10.0 --index-url https://download.pytorch.org/whl/cu130 --force-reinstall",
          "uv pip install bitsandbytes==0.48.0"
        ]
      },
      "next": null
    },
    // linux rocm (amd)
    {
      "when": "{{platform === 'linux' && gpu === 'amd'}}",
      "method": "shell.run",
      "params": {
        "bluefairy": "off",
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": [
          "uv pip install torch==2.10.0 torchvision==0.25.0 torchaudio==2.10.0 --index-url https://download.pytorch.org/whl/rocm7.1 --force-reinstall",
          "uv pip install bitsandbytes==0.49.2"
        ]
      },
      "next": null
    },
    // cpu
    {
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": [
          "uv pip install torch==2.10.0 torchvision==0.25.0 torchaudio==2.10.0  --index-url https://download.pytorch.org/whl/cpu --force-reinstall --no-deps",
          "uv pip install bitsandbytes==0.49.2"
        ]
      }
    }
  ]
}
