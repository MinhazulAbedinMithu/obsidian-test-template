<<<<<<< HEAD
import { ItemView, WorkspaceLeaf } from "obsidian";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ReactView } from "./ReactView";
import { createRoot } from "react-dom/client";
import { AppContext } from "./context";

export const VIEW_TYPE_EXAMPLE = "example-view";

export class ExampleView extends ItemView {
	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType() {
		return VIEW_TYPE_EXAMPLE;
	}

	getDisplayText() {
		return "TaskEasy view";
	}

	async onOpen() {
		const root = createRoot(this.containerEl.children[1]);

		root.render(
			<React.StrictMode>
				<AppContext.Provider value={this.app}>
					<ReactView />
				</AppContext.Provider>
			</React.StrictMode>
		);
	}

	async onClose() {
		ReactDOM.unmountComponentAtNode(this.containerEl.children[1]);
	}
}
=======
import { ItemView, WorkspaceLeaf } from "obsidian";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ReactView } from "./ReactView";
import { createRoot } from "react-dom/client";
import { AppContext } from "./context";

export const VIEW_TYPE_EXAMPLE = "example-view";

export class ExampleView extends ItemView {
	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType() {
		return VIEW_TYPE_EXAMPLE;
	}

	getDisplayText() {
		return "TaskEasy view";
	}

	async onOpen() {
		const root = createRoot(this.containerEl.children[1]);
		root.render(
			<React.StrictMode>
				<AppContext.Provider value={this.app}>
					<ReactView />
				</AppContext.Provider>
			</React.StrictMode>
		);
	}

	async onClose() {
		ReactDOM.unmountComponentAtNode(this.containerEl.children[1]);
	}
}
>>>>>>> 4f3c890104919e41bdbb1385ed5fafaeac1714fc
