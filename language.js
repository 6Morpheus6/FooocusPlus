module.exports = {
run:[
  {
      method: "input",
      params: {
        title: "Select Language",
        form: [{
          type: "select",
          key: "selection",
          items: [{
            text: "Albanian",
            value: "sq"
          }, {
            text: "Arabic",
            value: "ar"
          }, {
            text: "Azerbaijani",
            value: "az"
          }, {
            text: "Basque",
            value: "eu"
          }, {
            text: "Bulgarian",
            value: "bg"
          }, {
            text: "Catalan",
            value: "ca"
          }, {
            text: "Chinese (Simplified)",
            value: "zh"
          }, {
            text: "Chinese (Traditional)",
            value: "zt"
          }, {
            text: "Czech",
            value: "cs"
          }, {
            text: "Danish",
            value: "da"
          }, {
            text: "Dutch",
            value: "nl"
          }, {
            text: "English",
            value: "en"
          }, {
            text: "Esperanto",
            value: "eo"
          }, {
            text: "Estonian",
            value: "et"
          }, {
            text: "Finnish",
            value: "fi"
          }, {
            text: "French",
            value: "fr"
          }, {
            text: "Galician",
            value: "gl"
          }, {
            text: "German",
            value: "de"
          }, {
            text: "Greek",
            value: "el"
          }, {
            text: "Hebrew",
            value: "he"
          }, {
            text: "Hindi",
            value: "hi"
          }, {
            text: "Hungarian",
            value: "hu"
          }, {
            text: "Indonesian",
            value: "id"
          }, {
            text: "Irish",
            value: "ga"
          }, {
            text: "Italian",
            value: "it"
          }, {
            text: "Japanese",
            value: "ja"
          }, {
            text: "Korean",
            value: "ko"
          }, {
            text: "Kyrgyz",
            value: "ky"
          }, {
            text: "Latvian",
            value: "lv"
          }, {
            text: "Lithuanian",
            value: "lt"
          }, {
            text: "Malay",
            value: "ms"
          }, {
            text: "Norwegian",
            value: "nb"
          }, {
            text: "Persian",
            value: "fa"
          }, {
            text: "Polish",
            value: "pl"
          }, {
            text: "Portuguese",
            value: "pt"
          }, {
            text: "Portuguese (Brazil)",
            value: "pb"
          }, {
            text: "Romanian",
            value: "ro"
          }, {
            text: "Russian",
            value: "ru"
          }, {
            text: "Slovak",
            value: "sk"
          }, {
            text: "Slovenian",
            value: "sl"
          }, {
            text: "Spanish",
            value: "es"
          }, {
            text: "Swedish",
            value: "sv"
          }, {
            text: "Tagalog",
            value: "tl"
          }, {
            text: "Thai",
            value: "th"
          }, {
            text: "Turkish",
            value: "tr"
          }, {
            text: "Ukranian",
            value: "uk"
          }, {
            text: "Urdu",
            value: "ur"
          }]
        }]
      }
    },
    {
      // Persist the selected language so start.js can pass it as --language
      method: "json.set",
      params: {
        "language.json": {
          language: "{{input.selection}}"
        }
      }
    },
    {
      method: "notify",
      params: {
        html: "Selected Language: {{input.selection}}"
      }
    }
  ]
}