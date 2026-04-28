# Block Editor for Frappe

A port of the WordPress Gutenberg block editor for the Frappe Framework.

This app replaces the standard Frappe Web Page text editors with a rich, modern, block-based builder. Design complex layouts using columns, groups, rich text, images, and standard WordPress formatting blocks directly inside your Frappe Desk.

https://github.com/user-attachments/assets/a0ac710b-0214-47c7-9e14-5576ae90a202

## Features

- **True Gutenberg Experience:** Built directly with `@wordpress/block-editor` and related official WP packages.
- **Rich Block Library:** Supports paragraphs, headings, lists, quotes, images, columns, tables, buttons, separators, and more.
- **Visual Page Building:** Drag and drop blocks, resize columns, and structure layouts natively without writing HTML/CSS.
- **Seamless Frappe Integration:**
  - Adds a new "Block Editor" option to the `Web Page` Doctype.
  - Generates optimized, rendered HTML automatically for your website.
  - Built-in sidebar to manage Frappe-specific page settings (Route, Published status, SEO Meta Title, and Meta Description).

## Installation

You can install this app using the [bench](https://github.com/frappe/bench) CLI:

> **Note:** Ensure you have Node.js and `npm` installed on your system, as the frontend assets are built automatically during the app installation.

```bash
cd $PATH_TO_YOUR_BENCH
bench get-app https://github.com/DarkMatter-999/block_editor_frappe --branch develop
bench install-app block_editor_frappe
```

## Usage

1. Go to the **Web Page** list in your Frappe Desk and create a new Web Page.
2. Scroll down to the **Content Type** field and select **Block Editor**.
3. A special launcher box will appear. Click the **Edit Page Content** button to launch the full-screen Block Editor.
4. Use the `+` (Inserter) in the top left to add blocks.
5. Use the right sidebar to configure block-specific settings (Colors, Typography, Dimensions) or switch to the **Page** tab to edit your route slug, publish status, and SEO meta tags.
6. Click **Save** to sync your changes back to the Frappe document.

## Contributing

### Code Formatting and Linting
This app uses `pre-commit` for code formatting and linting. Please [install pre-commit](https://pre-commit.com/#installation) and enable it for this repository:

```bash
cd apps/block_editor_frappe
pre-commit install
```

Pre-commit is configured to use the following tools for checking and formatting your code:
- ruff
- eslint
- prettier
- pyupgrade

### Frontend Development
This project uses a React frontend powered by **Vite** that gets injected into the Frappe desk. To modify the block editor interface, run the Vite dev server:

```bash
cd apps/block_editor_frappe/block_editor_frontend

# Install dependencies
npm install

# Run the dev server to watch for changes
npm run dev
# OR to target just the frontend CSS
npm run dev:frontend
```

To manually compile the assets for production:
```bash
npm run build
npm run build:frontend
```

## License

GPL-3.0
