# Description of `update_news.py`

1. **Set Up Directory Paths**
   - It defines several directory paths to work with:
     - `affiliates_path`: Path to a directory containing Markdown files (with `.md` extension) for affiliates.
     - `html_path`: Path where the generated HTML files will be saved.
     - `json_path`: Path where a JSON file containing the list of Markdown files will be stored.
     - `template_html_path`: Path to an HTML template file that will be used to generate the final HTML files.

2. **Ensure Output Directory Exists**:
   - The script checks if the `html_path` directory exists. If it doesn't, it creates the directory using `os.makedirs()`, ensuring that the structure is in place to save the generated HTML files.

3. **Get List of Markdown Files**:
   - It lists all files in the `affiliates_path` directory and filters out only those with the `.md` extension. These are the Markdown files that will be processed.

4. **Save List of Markdown Files as JSON**:
   - It writes the list of Markdown filenames (`md_files`) to a JSON file at `json_path` using `json.dump()`. The list is saved in an indented format for better readability.

5. **Read the HTML Template**:
   - The script reads the contents of the `template_html_path` file, which contains an HTML template. This template will be used to create individual HTML pages for each Markdown file.

6. **Generate HTML Files**:
   - For each Markdown file in `md_files`:
     - It creates a corresponding HTML filename by replacing the `.md` extension with `.html`.
     - It replaces a placeholder `"MARKDOWN-NAME"` in the template HTML content with the Markdown file's name (i.e., the script inserts the Markdown filename into the HTML content).
     - It writes the modified HTML content to a new file in the `html_path` directory.

7. **Output**:
   - After processing each Markdown file, it prints a message indicating the successful generation of the corresponding HTML file.

## Summary

This script

- Reads Markdown files from a specified folder.
- Saves their filenames as a JSON list.
- Uses an HTML template to create a corresponding HTML file for each Markdown file, replacing a placeholder with the Markdown filename.
- Saves the generated HTML files to a designated folder.
