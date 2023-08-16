import { Plugin } from 'obsidian';
import { copyPlugin as copyInlineCodePlugin } from './copy-inline-code-view-plugin';

export default class CopyInlineCodePlugin extends Plugin {
	async onload() {
		this.registerEditorExtension([copyInlineCodePlugin]);
	}
}
