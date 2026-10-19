const path = require("path")
module.exports = {
  version: "8.0",
  title: "FooocusPlus",
  description: "An enhanced version of Fooocus giving you access to all of the latest AI image generation models",
  icon: "icon.png",
  menu: async (kernel, info) => {

    let accelerated

    if (kernel.platform === "darwin") {
      accelerated = kernel.arch === "arm64" // m1/m2/m3
    } else {
      accelerated = ["nvidia", "amd"].includes(kernel.gpu)  // gpu is amd/nvidia
    }

    let alwaysCPU = (accelerated ? "" : "--always-cpu ")

    let installed = info.exists("app/env")
    let running = {
      install: info.running("install.js"),
      start: info.running("start.js"),
      update: info.running("update.js"),
      reset: info.running("reset.js"),
      language: info.running("language.js")
    }
    if (running.install) {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Installing",
        href: "install.js",
      }]
    } else if (installed) {
      if (running.start) {
        let local = info.local("start.js")
        if (local && local.url) {
          return [{
            default: true,
            icon: "fa-solid fa-rocket",
            text: "Open Web UI",
            href: local.url,
          }, {
            icon: 'fa-solid fa-terminal',
            text: "Terminal",
            href: "start.js",
            params: { flags: `${alwaysCPU}--disable-in-browser` }
          }]
        } else {
          return [{
            default: true,
            icon: 'fa-solid fa-terminal',
            text: "Terminal",
            href: "start.js",
            params: { flags: `${alwaysCPU}--disable-in-browser` }
          }]
        }
      } else if (running.update) {
        return [{
          default: true,
          icon: 'fa-solid fa-terminal',
          text: "Updating",
          href: "update.js",
        }]
      } else if (running.reset) {
          return [{
            default: true,
            icon: 'fa-solid fa-terminal',
            text: "Resetting",
            href: "reset.js",
          }]
      } else if (running.language) {
          return [{
            default: true,
            icon: 'fa-solid fa-language',
            text: "Selecting Language",
            href: "language.js",
          }]
      } else {
        return [{
          default: true,
          icon: "fa-solid fa-power-off",
          text: "Start",
          href: "start.js",
          params: { flags: `${alwaysCPU}--disable-in-browser` }
        }, {
          icon: "fa-solid fa-plug",
          text: "Update",
          href: "update.js",
        }, {
          icon: "fa-solid fa-language",
          text: "Select Language",
          href: "language.js",
        }, {
          icon: "fa-solid fa-plug",
          text: "Install",
          href: "install.js",
        }, {
          icon: "fa-regular fa-circle-xmark",
          text: "Reset",
          href: "reset.js",
          confirm: "Are you sure you wish to reset the app?"
        }]
      }
    } else {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Install",
        href: "install.js",
      }]
    }
  }
}