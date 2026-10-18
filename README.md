# FooocusPlus

A pinokio script for https://github.com/DavidDragonsage/FooocusPlus

## Language

FooocusPlus supports many interface languages, passed to the app via the `--language` flag.

- At the end of the installation, a selection dialog asks for your preferred language.
- To change it later, click **Select Language** in the launcher menu.
- The selection is stored in `language.json` in the launcher root (`{ "language": "de" }` for German) and is automatically appended as `--language <code>` every time the app starts.
- If no selection has been made yet (e.g. existing installs), `en` is used as the default.
