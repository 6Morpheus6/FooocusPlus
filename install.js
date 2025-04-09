module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        messge: "git clone https://github.com/DavidDragonsage/FooocusPlus app"
      }
    }, {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",
          path: "app",
          xformers: true
        }
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: "uv pip install -r requirements_versions.txt"
      }
    },
    {
      method: "fs.share",
      params: {
        drive: {
          "checkpoints": "app/models/checkpoints",
          "clip": "app/models/clip",
          "clip_vision": "app/models/clip_vision",
          "configs": "app/models/configs",
          "controlnet": "app/models/controlnet",
          "diffusers": "app/models/diffusers",
          "embeddings": "app/models/embeddings",
          "gligen": "app/models/gligen",
          "hypernetworks": "app/models/hypernetworks",
          "inpaint": "app/models/inpaint",
          "loras": "app/models/loras",
          "prompt_expansion": "app/models/prompt_expansion",
          "style_models": "app/models/style_models",
          "unet": "app/models/unet",
          "upscale_models": "app/models/upscale_models",
          "vae": "app/models/vae",
          "vae_approx": "app/models/vae_approx"
        },
        peers: [
          "https://github.com/cocktailpeanut/fluxgym.git",
          "https://github.com/cocktailpeanutlabs/automatic1111.git",
          "https://github.com/cocktailpeanutlabs/comfyui.git",
          "https://github.com/cocktailpeanutlabs/fooocus.git",
          "https://github.com/pinokiofactory/comfy.git",
          "https://github.com/pinokiofactory/MagicQuill",
          "https://github.com/pinokiofactory/stable-diffusion-webui-forge.git"
        ]
      }
    },
    {
      method: "fs.share",
      params: {
        drive: {
          "outputs": "app/outputs"
        }
      }
    },
    {
      method: "fs.link",
      params: {
        venv: "app/env"
      }
    },
    {
      method: "notify",
      params: {
        html: "App launched. Click 'start' to get started"
      }
    }
  ]
}