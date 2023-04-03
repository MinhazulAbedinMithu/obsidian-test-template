export const demoRequest = [
	{
		deleteContentRange: {
			range: {
				startIndex: 1,
				endIndex:
					res.data.body.content[res.data.body.content.length - 1].endIndex - 1,
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
];

// {
//   insertText: {
//     text: "l 1", //2-4
//     endOfSegmentLocation: {},
//   },
// },
// {
//   updateTextStyle: {
//     range: {
//       startIndex: 39,
//       endIndex: 43,
//     },
//     textStyle: {
//       bold: true,
//     },
//     fields: "bold",
//   },
// },
// {
//   insertText: {
//     text: "\n", //33-38
//     endOfSegmentLocation: {},
//   },
// },
// {
//   updateTextStyle: {
//     range: {
//       startIndex: 43,
//       endIndex: 44,
//     },
//     textStyle: {
//       bold: false,
//       italic: false,
//     },
//     fields: "*",
//   },
// },

export const contentHTML = [
	{
		endIndex: 1,
		sectionBreak: {
			sectionStyle: {
				columnSeparatorStyle: "NONE",
				contentDirection: "LEFT_TO_RIGHT",
				sectionType: "CONTINUOUS",
			},
		},
	},
	{
		startIndex: 1,
		endIndex: 35,
		paragraph: {
			elements: [
				{
					startIndex: 1,
					endIndex: 22,
					textRun: {
						content: "2-28-23 Action Items:",
						textStyle: {
							bold: true,
						},
					},
				},
				{
					startIndex: 22,
					endIndex: 35,
					textRun: {
						content: " Added to tw\n",
						textStyle: {
							bold: true,
							foregroundColor: {
								color: {
									rgbColor: {
										red: 1,
									},
								},
							},
						},
					},
				},
			],
			paragraphStyle: {
				namedStyleType: "NORMAL_TEXT",
				direction: "LEFT_TO_RIGHT",
			},
		},
	},
	{
		startIndex: 35,
		endIndex: 130,
		paragraph: {
			elements: [
				{
					startIndex: 35,
					endIndex: 102,
					textRun: {
						content:
							"@Amelia find a way to make the editing payment by paypal [2-28-23] ",
						textStyle: {},
					},
				},
				{
					startIndex: 102,
					endIndex: 128,
					textRun: {
						content: "Confirmed, paypal accepted",
						textStyle: {
							bold: true,
						},
					},
				},
				{
					startIndex: 128,
					endIndex: 130,
					textRun: {
						content: " \n",
						textStyle: {},
					},
				},
			],
			paragraphStyle: {
				namedStyleType: "NORMAL_TEXT",
				direction: "LEFT_TO_RIGHT",
				indentFirstLine: {
					magnitude: 18,
					unit: "PT",
				},
				indentStart: {
					magnitude: 36,
					unit: "PT",
				},
			},
			bullet: {
				listId: "kix.isi8lbn8ivp8",
				textStyle: {},
			},
		},
	},
	{
		startIndex: 130,
		endIndex: 218,
		paragraph: {
			elements: [
				{
					startIndex: 130,
					endIndex: 218,
					textRun: {
						content:
							"@Amelia @Zeus verify that no more than 15% of anchor text are procedure-exact [3-5-23] \n",
						textStyle: {
							bold: true,
						},
					},
				},
			],
			paragraphStyle: {
				namedStyleType: "NORMAL_TEXT",
				direction: "LEFT_TO_RIGHT",
				indentFirstLine: {
					magnitude: 18,
					unit: "PT",
				},
				indentStart: {
					magnitude: 36,
					unit: "PT",
				},
			},
			bullet: {
				listId: "kix.isi8lbn8ivp8",
				textStyle: {
					bold: true,
				},
			},
		},
	},
	{
		startIndex: 218,
		endIndex: 358,
		paragraph: {
			elements: [
				{
					startIndex: 218,
					endIndex: 358,
					textRun: {
						content:
							"@Zeus check backlink profile in Semrush for Rodriguez-Feliz for the last 2 years to verify if they are keyword vs non anchor text [3-5-23] \n",
						textStyle: {
							bold: true,
						},
					},
				},
			],
			paragraphStyle: {
				namedStyleType: "NORMAL_TEXT",
				direction: "LEFT_TO_RIGHT",
				indentFirstLine: {
					magnitude: 18,
					unit: "PT",
				},
				indentStart: {
					magnitude: 36,
					unit: "PT",
				},
			},
			bullet: {
				listId: "kix.isi8lbn8ivp8",
				textStyle: {
					bold: true,
				},
			},
		},
	},
	{
		startIndex: 358,
		endIndex: 359,
		paragraph: {
			elements: [
				{
					startIndex: 358,
					endIndex: 359,
					textRun: {
						content: "\n",
						textStyle: {
							bold: true,
						},
					},
				},
			],
			paragraphStyle: {
				namedStyleType: "NORMAL_TEXT",
				direction: "LEFT_TO_RIGHT",
				indentFirstLine: {
					magnitude: 54,
					unit: "PT",
				},
				indentStart: {
					magnitude: 72,
					unit: "PT",
				},
			},
			bullet: {
				listId: "kix.hd8aa6n6h27p",
				nestingLevel: 1,
				textStyle: {
					bold: true,
					underline: false,
				},
			},
		},
	},
];
