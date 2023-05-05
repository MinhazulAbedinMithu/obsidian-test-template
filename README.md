<<<<<<< HEAD
#### Obsidian file to Google Docs file Integration

Agenda / Actions:

1.  **Google Docs to Obsidian:** If you add content in google docs. Then you need to get updated content in obsidian file.

1.  **Obsidian to Google Docs:** Edit Obsidian file content, and need to update specific google docs file from updated obsidian file content.

**PlayGround** (Create Custom Plugin in Obsidian) **:**

If we create custom plugin. We got a playground to implement our Login. We can create UI (User Interface), API Integration and access every element in ObsidianUi.

If we need to connect google docs file with obsidian. We need two things for API Integration.

There are: Google Authentication and Document ID.

1.  **Google Authentication:**
    Now we are use google playground to generate access token to use It. In future, add Google Authentication: ”Continue with Google”. That is time consuming and has app permission staff. That’s why ignored now.

1.  **Document ID:**

Every Google document has unique ID. That, get from docs url. Need docs file ID for connect with obsidian file.

So, We create a Form to get that inputs in above (access token, doc id) and also create two buttons for each actions (docs to md, md to docs).

**Essential Obsidian Plugin:**

1. Local REST API: It’s use for get and update vault files and also active vault file content.

**Implementation Procedure of Actions:**

1. Google Docs to Obsidian:

- Get Google docs data via document id. With access-token.
- Use a npm package and modified it for convert google docs format to convert in markdown.
- Use Local Rest Api Plugin to access active file markdown in obsidian.
- Active file content replace with fetched markdown data from docs.

1. Obsidian to Google Docs:

- Get active file content in md format with Local Rest Api.
- Markdown formatted data convert into html format. With markdown-it npm package.
- Get childNodes[ ] of the created html wrapper Div.
- Understood google batchupdate api requests body format like bold, italic, headings, paragraph to insert text and their styles. Manually create and test it.
- **Way:** Traversing childNodes array to insert element with specific style to generate requests [ ] body for batchupdate : update google docs.

**Faces Some Problems:**

1. Faces some problems in docs update api to creating Nested List and stop list content style.

2. After solving this issue, Try to create another package/function for html to generate document update api requests body dynamically.
=======
# Obsidian Sample Plugin

This is a sample plugin for Obsidian (https://obsidian.md).

This project uses Typescript to provide type checking and documentation.
The repo depends on the latest plugin API (obsidian.d.ts) in Typescript Definition format, which contains TSDoc comments describing what it does.

**Note:** The Obsidian API is still in early alpha and is subject to change at any time!

This sample plugin demonstrates some of the basic functionality the plugin API can do.
- Changes the default font color to red using `styles.css`.
- Adds a ribbon icon, which shows a Notice when clicked.
- Adds a command "Open Sample Modal" which opens a Modal.
- Adds a plugin setting tab to the settings page.
- Registers a global click event and output 'click' to the console.
- Registers a global interval which logs 'setInterval' to the console.

## First time developing plugins?

Quick starting guide for new plugin devs:

- Check if [someone already developed a plugin for what you want](https://obsidian.md/plugins)! There might be an existing plugin similar enough that you can partner up with.
- Make a copy of this repo as a template with the "Use this template" button (login to GitHub if you don't see it).
- Clone your repo to a local development folder. For convenience, you can place this folder in your `.obsidian/plugins/your-plugin-name` folder.
- Install NodeJS, then run `npm i` in the command line under your repo folder.
- Run `npm run dev` to compile your plugin from `main.ts` to `main.js`.
- Make changes to `main.ts` (or create new `.ts` files). Those changes should be automatically compiled into `main.js`.
- Reload Obsidian to load the new version of your plugin.
- Enable plugin in settings window.
- For updates to the Obsidian API run `npm update` in the command line under your repo folder.

## Releasing new releases

- Update your `manifest.json` with your new version number, such as `1.0.1`, and the minimum Obsidian version required for your latest release.
- Update your `versions.json` file with `"new-plugin-version": "minimum-obsidian-version"` so older versions of Obsidian can download an older version of your plugin that's compatible.
- Create new GitHub release using your new version number as the "Tag version". Use the exact version number, don't include a prefix `v`. See here for an example: https://github.com/obsidianmd/obsidian-sample-plugin/releases
- Upload the files `manifest.json`, `main.js`, `styles.css` as binary attachments. Note: The manifest.json file must be in two places, first the root path of your repository and also in the release.
- Publish the release.

> You can simplify the version bump process by running `npm version patch`, `npm version minor` or `npm version major` after updating `minAppVersion` manually in `manifest.json`.
> The command will bump version in `manifest.json` and `package.json`, and add the entry for the new version to `versions.json`

## Adding your plugin to the community plugin list

- Check https://github.com/obsidianmd/obsidian-releases/blob/master/plugin-review.md
- Publish an initial version.
- Make sure you have a `README.md` file in the root of your repo.
- Make a pull request at https://github.com/obsidianmd/obsidian-releases to add your plugin.

## How to use

- Clone this repo.
- `npm i` or `yarn` to install dependencies
- `npm run dev` to start compilation in watch mode.

## Manually installing the plugin

- Copy over `main.js`, `styles.css`, `manifest.json` to your vault `VaultFolder/.obsidian/plugins/your-plugin-id/`.

## Improve code quality with eslint (optional)
- [ESLint](https://eslint.org/) is a tool that analyzes your code to quickly find problems. You can run ESLint against your plugin to find common bugs and ways to improve your code. 
- To use eslint with this project, make sure to install eslint from terminal:
  - `npm install -g eslint`
- To use eslint to analyze this project use this command:
  - `eslint main.ts`
  - eslint will then create a report with suggestions for code improvement by file and line number.
- If your source code is in a folder, such as `src`, you can use eslint with this command to analyze all files in that folder:
  - `eslint .\src\`

## Funding URL

You can include funding URLs where people who use your plugin can financially support it.

The simple way is to set the `fundingUrl` field to your link in your `manifest.json` file:

```json
{
    "fundingUrl": "https://buymeacoffee.com"
}
```

If you have multiple URLs, you can also do:

```json
{
    "fundingUrl": {
        "Buy Me a Coffee": "https://buymeacoffee.com",
        "GitHub Sponsor": "https://github.com/sponsors",
        "Patreon": "https://www.patreon.com/"
    }
}
```

## API Documentation

See https://github.com/obsidianmd/obsidian-api
>>>>>>> 4f3c890104919e41bdbb1385ed5fafaeac1714fc
