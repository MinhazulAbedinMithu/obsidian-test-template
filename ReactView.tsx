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

export const ReactView = () => {
	const { vault } = useApp();
	const [todos, setTodos] = React.useState([]);
	const LocalApiToken =
		"Bearer 4a17f4c3dad7e4ebd00cc68623171a9542bc187a93acdd2ae0418de088ce096b";
	// React.useEffect(() => {
	// 	axios("https://jsonplaceholder.typicode.com/todos?_limit=5")
	// 		.then((res) => {
	// 			console.log(res.data);

	// 			setTodos(res.data);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});

	// }, []);
	// const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")

	const [formData, setFormData] = React.useState({
		// docId: null,
		docId: "1X6bWJXptBwUzVAlyRcCyE82KDrjJlL2wxf2PHn3kQ8k",
		// accessToken: null,
		accessToken:
			"ya29.a0Ael9sCPvVxlnyf6fGo7S7ZsYWdrGIz1dd9zIzlG8QnRfFp0KpPGnD-2RinVQnQo_XylnT6a92C588I7NnNazKg_rPi5VJ84iDUEhvUUlelYF4-wT6BJzEgWSCbe9I29f2kc-FVroHVRh8OLSr5xmKzUVj9R8aCgYKAVgSARISFQF4udJhhR8RTB5--_Wg4uQ4lhYHAw0163",
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
				console.log(res.data);

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
		setFormData({ ...formData, [key]: value });
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
			console.log({ wrapperDiv: wrapperDiv.childNodes });
			for (let i = 0; i < wrapperDiv.childNodes.length; i++) {
				const iEl = wrapperDiv.childNodes[i];
				console.log({
					nodeName: iEl.nodeName,
					nodeList: iEl.childNodes,
					node: iEl,
				});
				// let updateTextLength = 0;
				// switch (iEl.nodeName) {
				// 	case "#text":
				// 		updateRequest.push({
				// 			insertText: {
				// 				text: iEl.nodeValue,
				// 				//   location: {index: 1},
				// 				endOfSegmentLocation: {},
				// 			},
				// 		});
				// 		updateTextLength += iEl.textContent?.length;
				// 		break;
				// 	case "P":
				// 		for (let j = 0; j < iEl.childNodes.length; j++) {
				// 			const pEl = iEl.childNodes[j];
				// 			switch (pEl.nodeName) {
				// 				case "#text":
				// 					updateRequest.push({
				// 						insertText: {
				// 							text: pEl.nodeValue,
				// 							//   location: {index: 1},
				// 							endOfSegmentLocation: {},
				// 						},
				// 					});
				// 					updateTextLength += pEl.nodeValue?.length;
				// 					break;
				// 				case "EM":
				// 					updateRequest.push({
				// 						insertText: {
				// 							text: pEl?.outerText,
				// 							//   location: {index: 1},
				// 							endOfSegmentLocation: {},
				// 						},
				// 					});
				// 					updateTextLength += pEl.textContent?.length;

				// 					break;
				// 				default:
				// 					break;
				// 			}
				// 		}
				// 		updateRequest.push({
				// 			insertText: {
				// 				text: iEl.nodeValue,
				// 				endOfSegmentLocation: {},
				// 			},
				// 		});
				// 		break;

				// 	default:
				// 		break;
				// }
			}

			const docContent = {
				requests: [
					{
						insertText: {
							location: {
								index: 1,
							},
							text: "",
						},
					},
				],
			};

			// Apply formatting to the text
			const formattedHtmlContent = htmlContent.replace(
				/<\/?(h\d|strong|em)>/gi,
				(match) => {
					switch (match.toLowerCase()) {
						case "<h1>":
							return "<paragraph><bullet><textStyle><bold>";
						case "<h2>":
							return "<paragraph><bullet><textStyle><italic>";
						case "<h3>":
							return "<paragraph><textStyle><smallCaps>";
						case "<strong>":
							return "<textStyle><bold>";
						case "<em>":
							return "<textStyle><italic>";
						case "</h1>":
						case "</h2>":
						case "</h3>":
						case "</strong>":
						case "</em>":
							return "</textStyle></bullet></paragraph>";
						default:
							return match;
					}
				}
			);

			// Split the formatted HTML content into chunks of up to 100000 characters
			const chunks = formattedHtmlContent.match(/.{1,100000}/g);

			// Append each chunk to the docContent variable
			chunks.forEach((chunk) => {
				console.log(chunk);

				docContent.requests.push({
					insertText: {
						location: {
							index: -1,
						},
						text: chunk,
					},
				});
			});

			axios
				.get(`https://docs.googleapis.com/v1/documents/${formData.docId}`, {
					headers: {
						Authorization: `Bearer ${formData.accessToken}`,
					},
				})
				.then((res) => {
					axios
						.post(
							`https://docs.googleapis.com/v1/documents/${formData.docId}:batchUpdate`,
							{
								requests: [
									{
										deleteContentRange: {
											range: {
												startIndex: 1,
												// endIndex: {
												// 	endOfDocument: true,
												// },
												endIndex:
													res.data.body.content[
														res.data.body.content.length - 1
													].endIndex - 1,
											},
										},
									},
									{
										insertText: {
											text: "This is ", //8
											//   location: {index: 1},
											endOfSegmentLocation: {},
										},
									},
									{
										insertText: {
											text: "bold text", //9-17
											//   location: {index: 1},
											endOfSegmentLocation: {},
										},
									},
									{
										updateTextStyle: {
											range: {
												startIndex: 9,
												endIndex: 18,
											},
											textStyle: {
												bold: true,
											},
											fields: "bold",
										},
									},
									{
										insertText: {
											text: "\n", //17-18
											//   location: {index: 1},
											endOfSegmentLocation: {},
										},
									},
									{
										updateTextStyle: {
											range: {
												startIndex: 18,
												endIndex: 19,
											},
											textStyle: {
												bold: false,
												italic: false,
											},
											fields: "*",
										},
									},
									{
										insertText: {
											text: "This is ", //19-26
											//   location: {index: 19},
											endOfSegmentLocation: {},
										},
									},
									{
										updateTextStyle: {
											range: {
												startIndex: 19,
												endIndex: 27,
											},
											textStyle: {
												bold: false,
												italic: false,
											},
											fields: "*",
										},
									},
									{
										insertText: {
											text: "Italic", //27-32
											//   location: {index: 19},
											endOfSegmentLocation: {},
										},
									},
									{
										updateTextStyle: {
											range: {
												startIndex: 27,
												endIndex: 33,
											},
											textStyle: {
												bold: true,
											},
											fields: "bold",
										},
									},
									{
										updateTextStyle: {
											range: {
												startIndex: 27,
												endIndex: 33,
											},
											textStyle: {
												italic: true,
											},
											fields: "italic",
										},
									},
									{
										insertText: {
											text: " text", //33-38
											//   location: {index: 19},
											endOfSegmentLocation: {},
										},
									},
									{
										updateTextStyle: {
											range: {
												startIndex: 34,
												endIndex: 39,
											},
											textStyle: {
												bold: false,
												italic: false,
											},
											fields: "*",
										},
									},
									{
										insertText: {
											text: "\n", //39-40
											//   location: {index: 19},
											endOfSegmentLocation: {},
										},
									},
									{
										updateTextStyle: {
											range: {
												startIndex: 39,
												endIndex: 40,
											},
											textStyle: {
												bold: false,
												italic: false,
											},
											fields: "*",
										},
									},
									{
										insertText: {
											text: "list 1", //40-45
											endOfSegmentLocation: {},
										},
									},
									{
										insertText: {
											text: "\n", //45-46
											endOfSegmentLocation: {},
										},
									},
									{
										insertText: {
											text: "list 2", //46-51
											endOfSegmentLocation: {},
										},
									},
									{
										insertText: {
											text: "\n", //51-52
											endOfSegmentLocation: {},
										},
									},
									{
										insertText: {
											text: "nested 1", //52-60
											endOfSegmentLocation: {},
										},
									},
									{
										insertText: {
											text: "\n", //60-61
											endOfSegmentLocation: {},
										},
									},
									{
										insertText: {
											text: "\n", //61-62
											endOfSegmentLocation: {},
										},
									},
									{
										createParagraphBullets: {
											range: {
												startIndex: 40,
												endIndex: 61,
											},
											// bulletPreset: "BULLET_ARROW_DIAMOND_DISC",
											bulletPreset: "BULLET_DISC_CIRCLE_SQUARE",
										},
									},
									{
										updateTextStyle: {
											range: {
												startIndex: 40,
												endIndex: 46,
											},
											textStyle: {
												bold: true,
												italic: false,
												underline: false,
											},
											fields: "*",
										},
									},

									{
										insertText: {
											text: "dfffg\n", //33-38
											endOfSegmentLocation: {},
										},
									},
								],
							},
							{
								headers: {
									Authorization: `Bearer ${formData.accessToken}`,
								},
							}
						)
						.then((docsRes) => {
							console.log(docsRes.data);
						})
						.catch((err) => console.log(err));
				})
				.catch((err) => console.log(err));
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

	return (
		<div>
			<h4>{vault.getName()}</h4>
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
							onChange={(e) => handleChangeData("docId", e.target.value)}
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
							onChange={(e) => handleChangeData("accessToken", e.target.value)}
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
