# JavaScript Icon Loader Parser

## Description

This Python script is used to extract certain data from a JavaScript file (`icon-loader-nostale.js`). It specifically looks for pairs of "keys" and "values" that represent icon names and their corresponding image paths in the JavaScript content.

The script uses regular expressions (regex) to find the data and separate it into two lists: one for the icon keys and another for the image paths.

### Functionality

1. **Reading the JavaScript File**:  
   The script opens and reads a JavaScript file (`icon-loader-nostale.js`) containing data about game icons. The content of this file is loaded into memory as a string.

2. **Regular Expression**:  
   A regular expression pattern (`pattern`) is used to search for key-value pairs in the JavaScript file. The pattern is designed to match the following:
   - **Key**: This is an icon name wrapped in colons, e.g., `:SP1A:`, `:Ginseng:`.
   - **Value**: This is the relative image path associated with the icon, e.g., `/Archer/¤SP1A.gif`.

3. **Matching Data**:  
   Using the regex pattern, the script searches the JavaScript content for occurrences of icon keys and their associated image paths.

4. **Extraction of Keys and Values**:  
   - The **keys** are stored in the `keys` list, where each key represents an icon name (e.g., `:SP1A:`).
   - The **values** are stored in the `values` list, which contains the corresponding image paths (e.g., `/Archer/¤SP1A.gif`).

5. **Output**:  
   The script prints two sets of data:
   - The first list contains all the icon keys.
   - The second list contains the relative image paths.

### Example Output

For example, if the input JavaScript content contains the following lines:

```js
":SP1A:": "/images/public/icons/nostale/Archer/SP1A.gif",
":Ginseng:": "/images/public/icons/nostale/Items/Ginseng.gif"
```

The output would be:

```text
:SP1A:
:Ginseng:
----------
/Archer/SP1A.gif
/Items/Ginseng.gif
```

### Dependencies

- **re (Regular Expressions)**: This module is used to define and search with regular expressions in the script.
- The script assumes the JavaScript file (`icon-loader-nostale.js`) is located in a directory one level above the script's current directory.
