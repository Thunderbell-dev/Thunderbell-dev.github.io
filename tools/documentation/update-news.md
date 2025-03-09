# Description of `setup-news.py`

The `setup-news.py` script is designed to automate the setup process for a news website or project. It scans a folder of Markdown files, generates HTML files from them using a template, and creates a JSON file listing all the articles. This script is particularly useful for managing and publishing news articles on a website.

## Purpose of the Script

- Convert Markdown files into HTML files based on a predefined template.
- Create a JSON file that lists all available articles.
- Automatically generate a structured HTML output for each Markdown file.

## Steps the Script Follows

### 1. **Define Paths for Input and Output**

The script defines the paths where the files are located and where the generated files will be saved:

- `articles_path`: Path to the folder where the Markdown files (`.md`) are stored.
- `html_path`: Path where the generated HTML files will be saved.
- `json_path`: Path to store a JSON file listing the articles.
- `template_html_path`: Path to the HTML template used to generate the new HTML files.

### 2. **Ensure Output Directory Exists**

   The script ensures that the directory where HTML files will be saved (`html_path`) exists by using `os.makedirs()`. If the directory doesn't exist, it is created automatically.

### 3. **Collect All Markdown File Names**

   The script scans the `articles_path` directory for all files that end with `.md` using `os.listdir()`. It then creates a list of these files for further processing.

### 4. **Save JSON List of Articles**

   The script saves a JSON file (`news-list.json`) containing a list of the Markdown files found in the `articles_path`. This list is saved in a human-readable format using `json.dump()`, which will later be useful for reference or indexing purposes.

### 5. **Read Template HTML**

   The script opens and reads the content of the HTML template file (`news-article.html`). The template defines the basic structure of the HTML page, and the script will replace placeholders within this template to generate unique pages for each article.

### 6. **Generate HTML Files for Each Article**

For each Markdown file, the script:

- Extracts the name of the Markdown file and creates a corresponding HTML file name by replacing the `.md` extension with `.html`.
- Replaces the placeholder `"MARKDOWN-NAME"` in the template HTML with the actual name of the Markdown file.
- Writes the final HTML content to a new HTML file in the specified `html_path`.

### 7. **Output Messages**

   After processing each article, the script prints out the names of the files it has generated or updated:

- A message indicating that the JSON list of articles has been updated.
- A message indicating each HTML file that has been successfully generated.

## Example Output

- **Generated JSON File (`news-list.json`)**:

```json
   [
       "article1.md",
       "article2.md",
       "article3.md"
   ]
```

- **Generated HTML Files**:
   The script will create HTML files based on the template, for example:
- `article1.html`
- `article2.html`
- `article3.html`

   Each HTML file will have its content dynamically injected based on the template, with `"MARKDOWN-NAME"` replaced by the actual Markdown file name.

### Console Output

```terminal
JSON Updated: ../pages/news/news-list.json
Generated: ../pages/news/articles-html/article1.html
Generated: ../pages/news/articles-html/article2.html
Generated: ../pages/news/articles-html/article3.html
```

## How This Helps

- **Automation**: Saves time by automatically converting Markdown files to HTML and generating the article list in JSON format.
- **Organization**: Helps keep the project organized with a structured output of HTML files and an easily maintainable JSON list of articles.
- **Consistency**: Ensures that all HTML files are based on the same template, maintaining a consistent look and feel across the articles.

## Conclusion

The `setup-news.py` script simplifies the process of transforming a collection of Markdown files into HTML files suitable for publishing on a website. It also organizes the articles into a JSON file for easy indexing and reference. This is especially useful for managing news content on a website or for projects where content is regularly updated.
