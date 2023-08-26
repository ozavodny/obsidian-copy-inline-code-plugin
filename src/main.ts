import { Notice, Plugin } from 'obsidian';
import { copyPlugin as copyInlineCodePlugin } from './copy-inline-code-view-plugin';

export default class CopyInlineCodePlugin extends Plugin {

	async onload() {
		this.registerEditorExtension([copyInlineCodePlugin]);
		this.registerMarkdownPostProcessor((element, context) => {
			const inlineCodes = element.querySelectorAll("*:not(pre) > code");
			
			inlineCodes.forEach(code => {
				if(code.querySelector('span.copy-to-clipboard-icon')) {
					return
				}

				const icon = createSpan({cls: "copy-to-clipboard-icon", text: "\xa0📋"})
				const textToCopy = code.textContent

				icon.onclick = (event) => {			
					if(textToCopy) {
						event.stopPropagation();
						navigator.clipboard.writeText(textToCopy)
						new Notice(`Copied '${textToCopy}' to clipboard!`);
					}
				}
				
				code.appendChild(icon)
			})
		})
	}
}
