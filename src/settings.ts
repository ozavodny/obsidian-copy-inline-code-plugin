import CopyInlineCodePlugin from "./main";
import { App, PluginSettingTab, Setting } from "obsidian";

export class CopyInlineCodePluginTab extends PluginSettingTab {
	plugin: CopyInlineCodePlugin;

	constructor(app: App, plugin: CopyInlineCodePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();
		containerEl.createEl("p", {
			cls: "tasks-setting-important",
			text: "Changing any settings requires a restart of obsidian.",
		});

		new Setting(containerEl)
			.setName("Show on hover")
			.setDesc(
				"Copy icon only visible on hover (restart obsidian after change)"
			)
			.addToggle((component) => {
				component
					.setValue(this.plugin.settings.showOnHover)
					.onChange(async (value) => {
						this.plugin.settings.showOnHover = value;
						await this.plugin.saveSettings();
					});
			});

		containerEl.createEl("h3", { text: "Exclusion Patterns" });
		containerEl.createEl("p", {
			text: "Add regex patterns to exclude code blocks from showing the copy icon. If no patterns are added, all code blocks will show the icon.",
		});

		const regexListContainer = containerEl.createDiv();
		this.renderRegexList(regexListContainer);

		new Setting(containerEl).addButton((button) => {
			button.setButtonText("Add Exclusion Pattern").onClick(() => {
				this.plugin.settings.regexFilters.push(["", ""]);
				this.renderRegexList(regexListContainer);
			});
		});
	}

	private renderRegexList(container: HTMLElement) {
		container.empty();

		this.plugin.settings.regexFilters.forEach((regex, index) => {
			const setting = new Setting(container);
			setting
				.setName(`Pattern #${index + 1}`)
				.addText((text) => {
					text.setValue(regex[0])
						.setPlaceholder("regex pattern")
						.onChange(async (value) => {
							try {
								new RegExp(value, "");
							} catch {
								text.inputEl.classList.add("regex-input-error");
								return;
							}
							text.inputEl.classList.remove("regex-input-error");
							this.plugin.settings.regexFilters[index] = [
								value,
								regex[1],
							];
							await this.plugin.saveSettings();
						});

					const textEl = text.inputEl;
					textEl.style.width = "80%";
				})
				.addText((text) => {
					text.setValue(regex[1])
						.setPlaceholder("modifiers")
						.onChange(async (value) => {
							try {
								new RegExp("", value);
							} catch {
								text.inputEl.classList.add("regex-input-error");
								return;
							}
							text.inputEl.classList.remove("regex-input-error");
							this.plugin.settings.regexFilters[index] = [
								regex[0],
								value,
							];
							await this.plugin.saveSettings();
						});
					const textEl = text.inputEl;
					textEl.style.width = "20%";
				})
				.addButton((button) => {
					button
						.setIcon("trash")
						.setClass("mod-warning")
						.onClick(async () => {
							this.plugin.settings.regexFilters.splice(index, 1);
							await this.plugin.saveSettings();
							this.renderRegexList(container);
						});
				});
		});
	}
}
