import { CopyInlineCodePluginTab } from "./settings";
import { Notice, Plugin } from 'obsidian';
import { copyPlugin as copyInlineCodePlugin } from './copy-inline-code-view-plugin';


interface CopyInlineCodePluginSettings {
  showOnHover: boolean;
}

const DEFAULT_SETTINGS: Partial<CopyInlineCodePluginSettings> = {
  showOnHover: false,
};

export default class CopyInlineCodePlugin extends Plugin {
  settings: CopyInlineCodePluginSettings;

  async onload() {
    await this.loadSettings();

    

    this.addSettingTab(new CopyInlineCodePluginTab(this.app, this));
    this.copyInlineCodeLogic();
    
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  async copyInlineCodeLogic() {
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

