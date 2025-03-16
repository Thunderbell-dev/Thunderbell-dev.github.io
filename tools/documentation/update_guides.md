# Guide Updater Script

## Overview

This Python script automates the process of updating an HTML file (`index.html`) and a JSON file (`guides.json`) with a list of available guides in the `guides-html` folder. It performs two main functions:

1. **Update the HTML file** to dynamically list all available guide files and set the first guide as the default.
2. **Generate a JSON file** (`guides.json`) that contains a list of available guide files for easy access via JavaScript.

## Features

- Automatically detects all `.html` files in the `guides-html` directory.
- Updates the `<ul>` section in the `index.html` to reflect the latest guides.
- Sets the first `.html` file in alphabetical order as the default guide.
- Updates the `<iframe>` tag in `index.html` to display the first guide.
- Generates or updates `guides.json` with the latest guide list.
- Ensures that the navigation dynamically reflects new guide additions.

## How It Works

### **1. `update_guides_html(html_file, guides_folder)`**

- Reads all `.html` files from the specified `guides_folder`.
- Sorts them alphabetically.
- Updates the `<ul>` list in `index.html` to include all guide links.
- Updates the `<iframe>` source to load the first guide.
- Overwrites the existing `index.html` file with the updated content.

### **2. `update_guides_json(guides_folder, json_file)`**

- Reads all `.html` files from the `guides_folder`.
- Stores them as a list in a JSON structure.
- Saves the updated list into `guides.json`.

## File Paths

| File | Description |
|------|-------------|
| `../pages/guides/index.html` | The main HTML file where guide links and `<iframe>` are updated. |
| `../pages/guides/guides-html/` | Folder containing all guide `.html` files. |
| `../pages/guides/guides.json` | JSON file containing an array of available guides. |

## Usage

### **Running the Script**

Make sure Python is installed, then execute:

```sh
python update_guides.py
```

### **Expected Output**

- The `index.html` file is updated with the latest guide links.
- The `<iframe>` defaults to the first guide.
- `guides.json` is created or updated with the latest guide list.
- Console output:
  
  ```txt
  Guides section updated successfully.
  Generated ../pages/guides/guides.json successfully with X guides.
  ```

## Requirements

- Python 3.x
- The `guides-html` directory must contain at least one `.html` file.
- Write permissions for `index.html` and `guides.json`.

## Notes

- If no `.html` files are found, the script will abort the update process.
- Ensure that all guide filenames use valid characters.

## Future Improvements

- Add error handling for missing files or directories.
- Allow customization of the default guide selection.
- Implement logging for better debugging.
