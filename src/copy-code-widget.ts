import { EditorView, WidgetType } from "@codemirror/view";
import { Notice } from "obsidian";

export class CopyWidget extends WidgetType {
  showOnHover: boolean;
  iconSymbol: string;

  constructor(showOnHover: boolean, iconSymbol: string) {
    super();
    this.showOnHover = showOnHover;
    this.iconSymbol = iconSymbol;
  }

  toDOM(view: EditorView): HTMLElement {
    const icon = createSpan({cls:  "copy-to-clipboard-icon", text: `\xa0${this.iconSymbol}`})
    icon.toggleClass("show-on-hover", this.showOnHover)
    icon.onclick = (event) => {
        const element = (event.target as HTMLElement)
        let previousElement = element.previousElementSibling
        while(previousElement && !previousElement.matches('.cm-inline-code:not(.cm-formatting)')) {
          previousElement = previousElement.previousElementSibling
        }

        const textToCopy = previousElement?.textContent
        if(textToCopy) {
            navigator.clipboard.writeText(textToCopy)
            new Notice(`Copied '${textToCopy}' to clipboard!`);
        }
    }

    return icon;
  }
}
