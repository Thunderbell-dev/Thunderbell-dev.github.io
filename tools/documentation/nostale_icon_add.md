# JavaScript Icon Loader Updater

## Description

This Python script scans a specified folder containing game icon images and generates a new mapping for those icons to be used in a JavaScript file. The script performs the following tasks:

1. It traverses a given folder containing icon images (GIF, WebP, etc.).
2. It automatically renames any files that contain the '¤' symbol or spaces, removing these characters from the filenames.
3. It generates a JavaScript object (`imageMap`) where each icon is mapped to its relative image path.
4. It updates the JavaScript file by replacing the old `imageMap` with the newly generated one, adding appropriate comments for subfolders.

### Workflow

1. **Traverse Icons Folder**:
   - The script searches through the specified folder (`icons_folder`) and its subfolders for image files with `.gif` or `.webp` extensions.
  
2. **File Renaming**:
   - Any files containing the character '¤' in their name are renamed by removing the '¤' symbol.
   - Similarly, files with spaces in their names are renamed by removing the spaces.

3. **Generating JavaScript Lines**:
   - For each image file found, the script generates a JavaScript key-value pair in the format:  
  
    ```js
     ":icon_name:": "/images/public/icons/nostale/folder/icon_name.gif",
    ```

   - If the folder changes, a comment is added to indicate the new folder:

    ```js
    // Icons from folder: folder_name
    ```

4. **Update JavaScript File**:
   - The script looks for the `imageMap` definition inside the provided JavaScript file (`js_file_path`).
   - It replaces the entire `imageMap` content with the newly generated key-value mappings.
   - The updated `imageMap` is saved back to the original JavaScript file.

### Function Breakdown

#### `generate_icon_lines(icons_folder)`  

This function:

- Traverses the specified folder and its subfolders.
- Renames files containing '¤' or spaces in their names.
- Generates a list of JavaScript key-value lines representing the icons and their paths, while adding comments when the folder changes.

#### `update_js_file(js_file_path, icon_lines)`

This function:

- Reads the existing JavaScript file.
- Searches for the `imageMap` definition.
- Replaces the old `imageMap` with the newly generated one from `icon_lines`.
- Saves the updated JavaScript file.

### Example

Assuming the `icons_folder` contains the following files:

```txt
/Archer/¤SP1A.gif
/Items/Ginseng with space.gif
```

The script will:

- Rename `¤SP1A.gif` to `SP1A.gif` and `Ginseng with space.gif` to `Ginsengwithspace.gif`.
- Generate JavaScript lines like:

  ```js
  // Icons from folder: Archer/
  ":SP1A:": "/images/public/icons/nostale/Archer/SP1A.gif",
  // Icons from folder: Items/
  ":Ginsengwithspace:": "/images/public/icons/nostale/Items/Ginsengwithspace.gif",
  ```

- Update the JavaScript file by replacing the old `imageMap` with the new one.

### Usage

1. Set the `icons_folder` variable to the folder containing your icon images.
2. Set the `js_file_path` variable to the path of your JavaScript file that contains the `imageMap`.
3. Run the script, and it will automatically:
   - Rename any files containing '¤' or spaces.
   - Update the `imageMap` in the JavaScript file.

### Dependencies

- **os module**: This module is used to traverse the directory and rename files.

### Error Handling

- If the JavaScript file does not exist or any other error occurs during the process, appropriate error messages will be printed.

### Example Output

The script will print:

```txt
JavaScript file updated successfully with a new imageMap!
```

If an error occurs, an error message will be displayed, such as:

```txt
Error: The file ../scripts/icon-loader-nostale.js does not exist.
```
