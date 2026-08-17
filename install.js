module.exports = {
  requires: {
    bundle: "ai",
  },
  run: [
    {
      when: "{{!exists('app')}}",
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
        message: [
          "mkdir UserDir\\models\\checkpoints",
          "mkdir UserDir\\models\\clip_vision",
          "mkdir UserDir\\models\\prompt_expansion"
        ]
      },
        next: "share"
    },
    {
      when: "{{platform !== 'win32'}}",
      method: "shell.run",
      params: {
        message: [
          "mkdir -p UserDir/models/checkpoints",
          "mkdir -p UserDir/models/clip_vision",
          "mkdir -p UserDir/models/prompt_expansion"
        ]
      }
    },
    {
      id: "share",
      method: "fs.share",
      params: {
        drive: {
          "checkpoints": "UserDir/models/checkpoints",
          "clip": "UserDir/models/clip",
          "clip_vision": "UserDir/models/clip_vision",
          "configs": "UserDir/models/configs",
          "controlnet": "UserDir/models/controlnet",
          "diffusers": "UserDir/models/diffusers",
          "embeddings": "UserDir/models/embeddings",
          "gligen": "UserDir/models/gligen",
          "hypernetworks": "UserDir/models/hypernetworks",
          "inpaint": "UserDir/models/inpaint",
          "loras": "UserDir/models/loras",
          "prompt_expansion": "UserDir/models/prompt_expansion",
          "style_models": "UserDir/models/style_models",
          "unet": "UserDir/models/unet",
          "upscale_models": "UserDir/models/upscale_models",
          "vae": "UserDir/models/vae",
          "vae_approx": "UserDir/models/vae_approx"
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
          "outputs_focplus": "UserDir/Outputs"
        }
      }
    },
    {
      method: "hf.download",
      params: {
        path: "UserDir/models/clip_vision",
        "_": [ "openai/clip-vit-large-patch14" ],
        "exclude": [ "*.msgpack", "*.bin", "*.md", ".gittatributes" ],
        "local-dir": "clip-vit-large-patch14"
      }
    },
    {
      method: "hf.download",
      params: {
        path: "UserDir/models/prompt_expansion",
        "_": [ "LykosAI/GPT-Prompt-Expansion-Fooocus-v2" ],
        "exclude": [ "LICENSE", "*.md", ".gittatributes" ],
        "local-dir": "fooocus_expansion"
      }
    },
    {
      method: "fs.download",
      params: {
        uri: "https://huggingface.co/DavidDragonsage/FooocusPlus/resolve/main/support/elsewhereXL_v10.safetensors?download=true",
        dir: "UserDir/models/checkpoints",
      }
    },
    {
      "method": "fs.download",
      "params": {
        uri: "https://huggingface.co/Comfy-Org/Lumina_Image_2.0_Repackaged/resolve/main/split_files/vae/ae.safetensors?download=true",
        dir: "UserDir/models/vae"
      }
    },
    {
      method: "notify",
      params: {
        html: "Installation completed. Click Start to get started"
      }
    }
  ]
}