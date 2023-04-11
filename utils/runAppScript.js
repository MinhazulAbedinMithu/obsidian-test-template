const scriptId = "1nYK72KRme0a4SVXIrNdD_PXpU54jEkLejmtu-HvPryrDopR6UpJESdGt";

// Set the function name you want to run
const functionName = "importMarkdown";

// Set the document ID of the Google Doc you want to modify
const documentId = "1X6bWJXptBwUzVAlyRcCyE82KDrjJlL2wxf2PHn3kQ8k";

// Set the search and replace text
const searchText = "OLD_WORD";
const replaceText = "NEW_WORD";

// Set the access token to authenticate the request
const accessToken = "YOUR_ACCESS_TOKEN";

// Set the URL for the Apps Script API
const url = `https://script.googleapis.com/v1/scripts/${scriptId}:run`;

// Set the payload of the request
const payload = {
	function: functionName,
	parameters: [documentId, searchText, replaceText],
};

// Set the headers of the request
const headers = {
	Authorization: `Bearer ${accessToken}`,
	"Content-Type": "application/json",
};

// Make the HTTP POST request to the Apps Script API
fetch(url, {
	method: "POST",
	headers: headers,
	body: JSON.stringify(payload),
})
	.then((response) => response.json())
	.then((response) => {
		console.log(response);
	})
	.catch((error) => {
		console.error(error);
	});

// <div><p>amar <strong><em>sonar</em></strong> bangla</p><p>ami tomay valo pai </p><ul><li>list 1</li></ul><p>new para</p></div>
