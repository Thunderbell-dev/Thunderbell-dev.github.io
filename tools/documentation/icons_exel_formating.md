# JavaScript Icon Loader Parser

## Description

This Python script extracts key-value pairs representing icon names and their corresponding image paths from a JavaScript file (`icon-loader.js`). It uses regular expressions (regex) to search the file for these pairs and then outputs the results into two separate files: one for the keys (icon names) and one for the values (image paths).

### Functionality

1. **Reading the JavaScript File**:  
   The script opens and reads a JavaScript file (`icon-loader.js`) containing data about game icons. The entire content of the file is loaded into memory as a string for further processing.

2. **Regular Expression**:  
   A regular expression pattern (`pattern`) is used to search for key-value pairs in the JavaScript file. The pattern specifically matches:
   - **Key**: The icon name wrapped in colons, e.g., `:SP1A:`, `:Ginseng:`.
   - **Value**: The relative image path associated with the icon, e.g., `/images/public/icons/nostale/Archer/SP1A.gif`.

3. **Matching Data**:  
   The regex pattern is applied to the JavaScript content to find all occurrences of icon keys and their associated image paths.

4. **Extraction of Keys and Values**:  
   - The **keys** (icon names) are extracted and stored in the `keys` list.
   - The **values** (image paths) are extracted and stored in the `values` list, with the paths adjusted to remove extra characters and ensure proper formatting.

5. **Output**:  
   - The keys (icon names) are written to a file named `keys_output.txt`.
   - The values (image paths) are written to a file named `values_output.txt`.

6. **File Handling**:  
   The script generates two output files:
   - `keys_output.txt`: Contains the list of icon keys (e.g., `:SP1A:`, `:Ginseng:`).
   - `values_output.txt`: Contains the list of corresponding image paths (e.g., `/Archer/SP1A.gif`, `/Items/Ginseng.gif`).

### Example Output

Given the following input in the JavaScript file:

```js
":SP1A:": "/images/public/icons/nostale/Archer/SP1A.gif",
":Ginseng:": "/images/public/icons/nostale/Items/Ginseng.gif"
```

The output in `keys_output.txt` would be:

```text
:SP1A:
:Ginseng:
```

And the output in `values_output.txt` would be:

```text
/Archer/SP1A.gif
/Items/Ginseng.gif
```

### Dependencies

- **re (Regular Expressions)**: The `re` module is used to define and search for patterns in the JavaScript file content.
- **File System**: The script uses basic file handling to read the JavaScript file and write the output files.

### Notes

- The script assumes that the JavaScript file (`icon-loader.js`) is located in a directory one level above the script's current directory.
- The output is written to the same directory where the script is executed.
