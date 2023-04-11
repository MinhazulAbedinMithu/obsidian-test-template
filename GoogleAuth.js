const { google } = require("googleapis");
const { OAuth2Client } = require("google-auth-library");

const CLIENT_ID =
	"365103116509-02bb87eh9l2lesvitae55aktjm4ua2ec.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
// const REDIRECT_URI = "http://127.0.0.1:42813/callback";

export const authenticateWithGoogle = async () => {
	// Create a new OAuth2 client
	const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

	// Generate an authentication URL
	const authUrl = oAuth2Client.generateAuthUrl({
		access_type: "offline",
		scope: ["https://www.googleapis.com/auth/drive.readonly"],
	});

	// Open the authentication URL in a new window
	const authWindow = window.open(
		authUrl,
		"Auth",
		"width=600,height=800, scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no"
	);

	// Wait for the user to authenticate and return to the redirect URL
	const code = await new Promise((resolve) => {
		const intervalId = setInterval(() => {
			if (authWindow.closed) {
				clearInterval(intervalId);
				resolve(null);
			} else if (authWindow.location.href.startsWith(REDIRECT_URI)) {
				const url = new URL(authWindow.location.href);
				const code = url.searchParams.get("code");
				authWindow.close();
				clearInterval(intervalId);
				resolve(code);
			}
		}, 500);
	});

	// Exchange the authorization code for access and refresh tokens
	const { tokens } = await oAuth2Client.getToken(code);
	oAuth2Client.setCredentials(tokens);

	return oAuth2Client;
};
