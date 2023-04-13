import * as React from "react";
import { useApp } from "./hooks";
import axios from "axios";
import { googleDocsToMarkdown } from "docs-markdown";
import { google } from "googleapis";
import { writeFileSync } from "fs";
const markdownIt = require("markdown-it")();
const oauth2Client = new google.auth.OAuth2();
const docs = google.docs("v1");
import * as showdown from "showdown";
import { authenticateWithGoogle } from "./GoogleAuth";
import { VIEW_TYPE_EXAMPLE } from "./view";

export const ReactView = () => {
	const { vault, workspace } = useApp();
	const [todos, setTodos] = React.useState([]);
	const LocalApiToken =
		"Bearer 4a17f4c3dad7e4ebd00cc68623171a9542bc187a93acdd2ae0418de088ce096b";

	// React.useEffect(() => {
	// 	console.log({
	// 		name: workspace.getActiveFile().name,
	// 		localName: localStorage.getItem(workspace.getActiveFile().name),
	// 	});

	// 	setFormData({
	// 		...formData,
	// 		docId: localStorage.getItem(workspace.getActiveFile().name)
	// 			? localStorage.getItem(workspace.getActiveFile().name)
	// 			: null,
	// 	});
	// }, []);

	workspace.on("file-open", () => {
		console.log(
			"Inplugin Active file changed, reloading plugin...",
			workspace.getActiveFile().name
		);
		setFormData({
			...formData,
			docId: localStorage.getItem(workspace.getActiveFile().name)
				? localStorage.getItem(workspace.getActiveFile().name)
				: null,
		});
	});

	// const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")

	// const activeFileName = useApp().workspace.getActiveFile().name

	const [formData, setFormData] = React.useState({
		docId: null,
		// docId: "1X6bWJXptBwUzVAlyRcCyE82KDrjJlL2wxf2PHn3kQ8k",
		accessToken: null,
		//accessToken:"ya29.a0Ael9sCOzRuUBOsy4FZW7__tK-bvP6kDy5UT2YWGrGLLwT9bQ-HAQtRE1lqAsqaTVM6iWxancbtTJs6wGEdCPxBYss09ixQNRzEbEGNmcrjaWr_KGgxt3pV69UddIrZ_NbeURZ1GobpMSaQUnP4lUx-padqM_aCgYKAbcSARISFQF4udJh6B1tBAWwtmwC6u2dEfFXgA0163",
	});
	// const [currentFileContent, setCurrentFileContent] = React.useState("");
	const [user, setUser] = React.useState(null);
	// const [docsData, setDocsData] = React.useState(null);

	const handleSubmit = (e) => {
		e.preventDefault();
		// axios
		// 	.post("https://developer-beta.taskeasy.io/api/auth/login", formData)
		// 	.then((res) => {
		// 		if (res.data.success) {
		// 			setUser(res.data);
		// 			console.log(res.data);
		// 		}
		// 	})
		// 	.catch((err) => console.log(err));
		// if (formData.docId && formData.accessToken) {
		axios
			.get(`https://docs.googleapis.com/v1/documents/${formData.docId}`, {
				headers: {
					Authorization: `Bearer ${formData.accessToken}`,
				},
			})
			.then((res) => {
				// console.log(res.data);

				const markdown = googleDocsToMarkdown(res.data);
				console.log({ markdown });
				fetch(`http://127.0.0.1:27123/active`, {
					method: "PUT",
					headers: {
						"Content-Type": "text/markdown",
						Authorization: LocalApiToken,
					},
					body: `${markdown}`,
				})
					.then((res) => console.log(res))
					.catch((err) => console.log(err));
				// setDocsData(markdown);
			})
			.catch((err) => console.log(err));
		// }
	};

	// const handleLoadTodo = () => {
	// 	axios("https://jsonplaceholder.typicode.com/todos?_limit=5")
	// 		.then((res) => {
	// 			// console.log(res.data);

	// 			setTodos(res.data);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// };

	// useApp().workspace.on("editor-change", (editor) => {
	// 	const content = editor.getDoc().getValue();
	// 	setCurrentFileContent(content);
	// });

	const handleChangeData = (key: string, value: string) => {
		// setFormData({ ...formData, [key]: value });
		if (key === "docId") {
			console.log(workspace.getActiveFile().basename);
			const localFileName = localStorage.getItem(
				workspace.getActiveFile().name
			);
			console.log({ localFileName });
			if (localFileName) {
				setFormData({ ...formData, docId: value });
			} else {
				localStorage.setItem(workspace.getActiveFile().name, value);
				setFormData({ ...formData, docId: value });
			}
		} else {
			setFormData({ ...formData, [key]: value });
		}
	};
	const handleClearForm = () => {
		setFormData({ docId: null, accessToken: null });
		localStorage.removeItem(workspace.getActiveFile().name);
	};

	const handlePushDocsFromActiveFile = () => {
		const wrapperDiv = document.createElement("div");
		const updateRequest = [];
		axios(`http://127.0.0.1:27123/active`, {
			headers: {
				"Content-Type": "text/markdown",
				Authorization: LocalApiToken,
			},
		}).then((activeFileRes) => {
			console.log({
				data: activeFileRes.data,
				dataLen: activeFileRes.data.length,
			});

			const htmlContent = markdownIt.render(activeFileRes.data);
			wrapperDiv.innerHTML = htmlContent;
			console.log({ wrapperDiv: wrapperDiv.innerHTML, div: wrapperDiv });
			axios
				.post(
					"https://api-beta.taskeasy.io/api/call-to-google",
					{
						strHtml: `<div>${wrapperDiv.innerHTML}</div>`,
						docId: formData.docId,
					},
					{
						headers: {
							Authorization: `Bearer ${formData.accessToken}`,
							"Access-Control-Allow-Origin": "*",
						},
					}
				)
				.then((res) => {
					console.log(res.data);
				})
				.catch((err) => console.log(err));

			// axios
			// 	.get(`https://docs.googleapis.com/v1/documents/${formData.docId}`, {
			// 		headers: {
			// 			Authorization: `Bearer ${formData.accessToken}`,
			// 		},
			// 	})
			// 	.then((res) => {
			// 		axios
			// 			.post(
			// 				`https://docs.googleapis.com/v1/documents/${formData.docId}:batchUpdate`,
			// 				{
			// 					requests: [],
			// 				},
			// 				{
			// 					headers: {
			// 						Authorization: `Bearer ${formData.accessToken}`,
			// 					},
			// 				}
			// 			)
			// 			.then((docsRes) => {
			// 				console.log(docsRes.data);
			// 			})
			// 			.catch((err) => console.log(err));
			// 	})
			// 	.catch((err) => console.log(err));
		});
	};

	// const handleGetFileData = (fileName) => {
	// 	console.log(fileName);
	// 	// axios
	// 	// 	.put(`http://127.0.0.1:27123/vault/${fileName}`, docsData, {
	// 	// 		headers: {
	// 	// 			contentType: "text/markdown",
	// 	// 			Authorization:
	// 	// 				"Bearer 3a848ddc6c8e6ec3b8162d17fc49e63897d37fb478af1eb8bb31fb9a93d4ab96",
	// 	// 		},
	// 	// 	})
	// 	// 	.then((res) => {
	// 	// 		console.log(res.data);
	// 	// 	})
	// 	// 	.catch((err) => {
	// 	// 		console.log(err);
	// 	// 	});
	// 	fetch(`http://127.0.0.1:27123/vault/${fileName}`, {
	// 		method: "PUT",
	// 		headers: {
	// 			"Content-Type": "text/markdown",
	// 			Authorization:
	// 				"Bearer 3a848ddc6c8e6ec3b8162d17fc49e63897d37fb478af1eb8bb31fb9a93d4ab96",
	// 		},
	// 		body: `${docsData}`,
	// 	})
	// 		.then((res) => console.log(res))
	// 		.catch((err) => console.log(err));
	// };
	// const handleSetActiveFileData = () => {
	// 	fetch(`http://127.0.0.1:27123/active`, {
	// 		method: "PUT",
	// 		headers: {
	// 			"Content-Type": "text/markdown",
	// 			Authorization:
	// 				"Bearer 3a848ddc6c8e6ec3b8162d17fc49e63897d37fb478af1eb8bb31fb9a93d4ab96",
	// 		},
	// 		body: `${docsData}`,
	// 	})
	// 		.then((res) => console.log(res))
	// 		.catch((err) => console.log(err));
	// };

	// const handleConvertDocsToMd = async () => {
	// 	axios
	// 		.get(
	// 			"https://docs.googleapis.com/v1/documents/1X6bWJXptBwUzVAlyRcCyE82KDrjJlL2wxf2PHn3kQ8k",
	// 			{
	// 				headers: {
	// 					Authorization:
	// 						"Bearer ya29.a0AVvZVsqKCQO6saGlsU8CqXd6yRQbJeKC0trD5cFdoTBEKH7Pl_8K1QsWlkMhySy84UffPsXpFOoiNo5YC1uTYvt_c7E0Vy9qJjLOK0qtvz1mTsk8DKI2l3Q9abBa1NkGeJzUCrYBEtSPi50tSpG9l1rwFIetOirAaCgYKAUgSARISFQGbdwaI-UNkjQHNZeIXWGeXC0beBA0167",
	// 				},
	// 			}
	// 		)
	// 		.then((res) => {
	// 			console.log(res.data);

	// 			const markdown = googleDocsToMarkdown(res.data);
	// 			console.log({ markdown });
	// 			setDocsData(markdown);
	// 		})
	// 		.catch((err) => console.log(err));

	// 	// const file = await docs.documents.get({
	// 	// 	documentId: "1X6bWJXptBwUzVAlyRcCyE82KDrjJlL2wxf2PHn3kQ8k",
	// 	// 	auth: "AIzaSyAycxIgrLiZOa9chB9bgut3nRXcHPerdyg",
	// 	// });

	// 	// const markdown = googleDocsToMarkdown(file.data);
	// 	// console.log(markdown);
	// };

	// const handleContentSetToDocs = () => {
	// 	console.log({ currentFileContent });

	// 	fetch(
	// 		"https://docs.googleapis.com/v1/documents/1X6bWJXptBwUzVAlyRcCyE82KDrjJlL2wxf2PHn3kQ8k:batchUpdate",
	// 		{
	// 			method: "POST",
	// 			headers: {
	// 				"Content-Type": "text/markdown",
	// 				Authorization:
	// 					"Bearer ya29.a0AVvZVsr4SJQojDKK7KapT4hd5E1lpsjSOJrPpqT0RyFdhbJjuKuRC64039uG79HgU0hakOc55EjsEVuvizFy6NxRlYU8Fc14BgEvZVchvrafyj88eLeol8GRWSG7tWarZvLl1Tv_GjxggowQiPRJaIUINPUuaCgYKAa4SARISFQGbdwaI7R625W07hyXpPa6tbD6piA0163",
	// 			},
	// 			body: JSON.stringify({
	// 				request: [
	// 					{
	// 						replaceAllText: {
	// 							replaceText: `${currentFileContent}`,
	// 						},
	// 					},
	// 				],
	// 			}),
	// 		}
	// 	)
	// 		.then((res) => {
	// 			console.log(res);
	// 			// const markdown = googleDocsToMarkdown(res.data);
	// 			// console.log(markdown);
	// 		})
	// 		.catch((err) => console.log(err));
	// };

	const handleGoogleAuth = async () => {
		const client = await authenticateWithGoogle();
		console.log("Authenticated with Google:", client);
	};

	return (
		<div>
			<button onClick={handleGoogleAuth}>Continue with Google</button>
			<h4>{vault.getName()}</h4>

			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					paddingBottom: "10px",
				}}
			>
				<button onClick={handleClearForm}>Clear Form</button>
			</div>
			{user === null ? (
				<form
					action=""
					onSubmit={(e) => handleSubmit(e)}
					style={{
						border: "1px solid gray",
						borderRadius: "8px",
						padding: "10px 5px",
					}}
				>
					<h4 style={{ textAlign: "center", padding: "10px 0" }}>Docs to Md</h4>
					<div
						style={{
							display: "flex",
							alignItems: "start",
							justifyContent: "start",
							paddingBottom: "10px",
							flexDirection: "column",
						}}
					>
						<label htmlFor="docId">Document id:</label>

						<input
							style={{ width: "100%" }}
							type="text"
							id="docId"
							required
							placeholder="Enter document id"
							value={formData.docId}
							onBlur={(e) => handleChangeData("docId", e.target.value)}
						/>
					</div>
					<div
						style={{
							display: "flex",
							alignItems: "start",
							justifyContent: "start",
							paddingBottom: "10px",
							flexDirection: "column",
						}}
					>
						<label htmlFor="accessToken">Access Token</label>
						<input
							style={{ width: "100%" }}
							type="text"
							id="accessToken"
							required
							placeholder="Enter access token"
							onBlur={(e) => handleChangeData("accessToken", e.target.value)}
						/>
					</div>

					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<button type="submit">Pull document to active file</button>
					</div>
				</form>
			) : (
				<div>
					<h4>Welcome to Taskeasy</h4>
					<p>Hello {user.user.name}</p>
					<button
						onClick={() => {
							setUser(null);
							setFormData({ docId: null, accessToken: null });
						}}
					>
						Logout
					</button>
				</div>
			)}
			{/*vault.getFiles().map((file, index) => (
				<div key={index}>
					<h2 onClick={() => handleGetFileData(file.name)}>
						{file.name}{" "}
					</h2>
				</div>
			)) */}
			{/*<div
				className="todos-container"
				style={{
					border: "1px solid green",
					padding: "10px 5px",
					marginTop: "20px",
				}}
			>
				<button onClick={handleLoadTodo}>Load Todo</button>
				<h2>Todos</h2>
				{todos?.map((todo) => (
					<div key={todo.id}>{todo.title}</div>
				))}
			</div> */}
			<div style={{ paddingTop: "20px" }}>
				<button onClick={handlePushDocsFromActiveFile}>
					Push docs from active file
				</button>
			</div>
			{/*<div style={{ border: "1px solid red" }}>
				<h2>Current File Content</h2>
				<div>
					{currentFileContent.split("\n").map((contEl, index) => (
						<div key={index}>
							<span>{contEl}</span>
						</div>
					))}
				</div>
			</div>
			<div style={{ padding: "20px 0", borderTop: "2px solid gray" }}>
				<button onClick={handleConvertDocsToMd}>
					Get Docs Data To Md
				</button>
				<button onClick={handleSetActiveFileData}>
					Set Content In Active file
				</button>
				<button onClick={handleContentSetToDocs}>Update Docs</button>
			</div> */}
		</div>
	);
};
