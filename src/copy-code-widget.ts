import { EditorView, WidgetType } from "@codemirror/view";
import { Notice } from "obsidian";

export class CopyWidget extends WidgetType {
    constructor() {
        super();
    }

  toDOM(view: EditorView): HTMLElement {
    const icon = createSpan({cls: "copy-to-clipboard-icon", text: " 📋"})

    icon.onclick = (event) => {
        const textToCopy = (event.target as HTMLElement)?.parentNode?.querySelector('.cm-inline-code:not(.cm-formatting)')?.innerHTML
        if(textToCopy) {
            navigator.clipboard.writeText(textToCopy)
            new Notice(`Copied '${textToCopy}' to clipboard!`);
        }
    }

    return icon;
  }
}