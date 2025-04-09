module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        message: "git clone https://github.com/DavidDragonsage/FooocusPlus app"
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: "uv pip install -r ../requirements_versions.txt --index-strategy unsafe-best-match"
      }
    },
    {
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
      when: "{{platform === 'win32'}}",
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "mkdir models\\clip_vision",
          "mkdir models\\prompt_expansion"
        ]
      },
        next: "share"
    },
    {
      when: "{{platform !== 'win32'}}",
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "mkdir -p models/clip_vision",
          "mkdir -p models/prompt_expansion"
        ]
      }
    },
    {
      id: "share",
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
          "outputs_focplus": "Outputs"
        }
      }
    },
    {
      method: "hf.download",
      params: {
        path: "app/models/clip_vision",
        "_": [ "openai/clip-vit-large-patch14" ],
        "exclude": '"*.msgpack" "*.bin" "*.md" ".gittatributes"',
        "local-dir": "clip-vit-large-patch14"
      }
    },
    {
      method: "hf.download",
      params: {
        path: "app/models/prompt_expansion",
        "_": [ "LykosAI/GPT-Prompt-Expansion-Fooocus-v2" ],
        "exclude": '"LICENSE" "*.md" ".gittatributes"',
        "local-dir": "fooocus_expansion"
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