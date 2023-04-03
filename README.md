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
