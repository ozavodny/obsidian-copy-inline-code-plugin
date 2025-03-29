import { CopyInlineCodePluginTab } from "./settings";
import { Notice, Plugin } from "obsidian";
import { createCopyPlugin } from "./copy-inline-code-view-plugin";
import { RegexFilters, shouldExclude } from "./regex-exclude";

interface CopyInlineCodePluginSettings {
	showOnHover: boolean;
	regexFilters: RegexFilters;
}

const DEFAULT_SETTINGS: Partial<CopyInlineCodePluginSettings> = {
	showOnHover: false,
	regexFilters: [],
};

export default class CopyInlineCodePlugin extends Plugin {
	settings: CopyInlineCodePluginSettings;

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new CopyInlineCodePluginTab(this.app, this));
		this.copyInlineCodeLogic();
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	async copyInlineCodeLogic() {
		this.registerEditorExtension([
			createCopyPlugin(
				this.settings.showOnHover,
				this.settings.regexFilters
			),
		]);
		this.registerMarkdownPostProcessor((element, context) => {
			const inlineCodes = element.querySelectorAll("*:not(pre) > code");

			inlineCodes.forEach((code) => {
				if (code.querySelector("span.copy-to-clipboard-icon")) {
					return;
				}

				const textToCopy = code.textContent;
				if (!textToCopy) {
					return;
				}

				if (shouldExclude(textToCopy, this.settings.regexFilters)) {
					return;
				}

				const icon = createSpan({
					cls: "copy-to-clipboard-icon",
					text: "\xa0📋",
				});
				icon.toggleClass("show-on-hover", this.settings.showOnHover);

				icon.onclick = (event) => {
					if (textToCopy) {
						event.stopPropagation();
						navigator.clipboard.writeText(textToCopy);
						new Notice(`Copied '${textToCopy}' to clipboard!`);
					}
				};

				code.appendChild(icon);
			});
		});
	}
}
