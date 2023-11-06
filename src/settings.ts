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
    containerEl.createEl('p', {
        cls: 'tasks-setting-important',
        text: 'Changing any settings requires a restart of obsidian.',
    });
    
    new Setting(containerEl)
      .setName("Show on hover")
      .setDesc("Copy icon only visible on hover (restart obsidian after change)")
      .addToggle((component) => {
          component
          .setValue(this.plugin.settings.showOnHover)
          .onChange(async (value) => {
            this.plugin.settings.showOnHover = value;
            await this.plugin.saveSettings();
          })
        });
  }
}
