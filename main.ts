import { Notice, Plugin } from "obsidian";
import { ExampleModal } from "./modal";
import { ExampleView, VIEW_TYPE_EXAMPLE } from "./view";
import { ReactView } from "./ReactView";

export default class ExamplePlugin extends Plugin {
	statusBarTextElement: HTMLSpanElement;

	async onload() {
		this.addRibbonIcon("dice", "TaskEasy View", () => {
			this.activateView();
		});

		this.registerView(VIEW_TYPE_EXAMPLE, (leaf) => new ExampleView(leaf));
		this.addCommand({
			id: "display-modal",
			name: "Display modal",
			callback: () => {
				new ExampleModal(this.app, (result) => {
					new Notice(`Hello, ${result}!`);
				}).open();
			},
		});

		// this.app.workspace.on("file-open", () => {
		// 	console.log(
		// 		"Active file changed, reloading plugin...",
		// 		this.app.workspace.getActiveFile().name
		// 	);
		// });

		//new line count
		this.statusBarTextElement = this.addStatusBarItem().createEl("span");
		this.readActiveFileAndUpdateLineCount();

		this.app.workspace.on("active-leaf-change", async () => {
			this.readActiveFileAndUpdateLineCount();
		});
		this.app.workspace.on("editor-change", (editor) => {
			const content = editor.getDoc().getValue();

			this.updateLineCount(content);
			this.readActiveFileAndGetContent();
		});
	}

	async onunload() {
		this.app.workspace.detachLeavesOfType(VIEW_TYPE_EXAMPLE);
	}

	async activateView() {
		this.app.workspace.detachLeavesOfType(VIEW_TYPE_EXAMPLE);

		await this.app.workspace.getRightLeaf(false).setViewState({
			type: VIEW_TYPE_EXAMPLE,
			active: true,
		});

		this.app.workspace.revealLeaf(
			this.app.workspace.getLeavesOfType(VIEW_TYPE_EXAMPLE)[0]
		);
	}

	//File content Count in bottom:::
	private updateLineCount(fileContent?: string) {
		const count = fileContent ? fileContent.split(/\r\n|\r|\n/).length : 0;
		const lineWord = count === 1 ? "line" : "lines";
		this.statusBarTextElement.textContent = `${count} ${lineWord}`;
	}
	private async readActiveFileAndUpdateLineCount() {
		const file = this.app.workspace.getActiveFile();
		if (file) {
			const content = await this.app.vault.read(file);
			// console.log({ content });

			this.updateLineCount(content);
		} else {
			this.updateLineCount(undefined);
		}
	}

	//Work With Active file:::
	private async readActiveFileAndGetContent(fileContent?: string) {
		// console.log({ fileContent });
	}
}
