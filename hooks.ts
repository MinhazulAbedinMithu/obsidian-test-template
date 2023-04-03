import { App } from "obsidian";
import React = require("react");
import { AppContext } from "./context";

export const useApp = (): App | undefined => {
	return React.useContext(AppContext);
};
