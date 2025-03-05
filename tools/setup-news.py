import os
import json

# Paths
articles_path = "../pages/news/articles/"
html_path = "../pages/news/articles-html/"
json_path = "../pages/news/news-list.json"
template_html_path = "../templates/news-article.html"

# Ensure the output directory exists
os.makedirs(html_path, exist_ok=True)

# Get all Markdown file names
md_files = [f for f in os.listdir(articles_path) if f.endswith(".md")]

# Save JSON list of articles
with open(json_path, "w", encoding="utf-8") as json_data:
    json.dump(md_files, json_data, indent=4)

print(f"JSON Updated: {json_path}")

# Read template HTML
with open(template_html_path, "r", encoding="utf-8") as template_file:
    template_content = template_file.read()

# Process each Markdown file
for md_file in md_files:
    md_name = md_file  # Markdown file name
    html_name = md_file.replace(".md", ".html")  # Corresponding HTML file name
    html_content = template_content.replace("MARKDOWN-NAME", md_name)
    
    # Write to the new HTML file
    html_file_path = os.path.join(html_path, html_name)
    with open(html_file_path, "w", encoding="utf-8") as html_file:
        html_file.write(html_content)
    
    print(f"Generated: {html_file_path}")
