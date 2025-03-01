# HTML Header and Footer Sync Script

This script is designed to help update the header and footer sections of multiple HTML files across a directory structure. It compares and updates the header and footer sections from a template file (`site.html` or any other template you provide) into other HTML files (e.g., `index.html` or any other HTML files within subdirectories). This is useful when you need to keep your header and footer content consistent across many pages in your website.

## Features

- **Update Header/Footer Sections**: Compares the header and footer in the target HTML file with the ones from a template and updates them if necessary.
- **Insert Missing Header/Footer**: If the header or footer is missing in the target HTML file, it will automatically insert the one from the template.
- **Preserve Existing Content**: Only the header and footer are modified. Other content, including links (`href` attributes), remains unchanged.
- **Supports Subdirectories**: The script can be used across subdirectories, ensuring that all HTML files (even in nested folders) get updated.
- **Empty Files**: If the target file is empty (only whitespace), it will copy the entire content of the template file into the target.

## Requirements

- Python 3.x or later
- Basic knowledge of HTML structure (for understanding how headers and footers work)

## How It Works

1. The script takes in a **template HTML file** (e.g., `site.html`) and compares its header and footer sections with each target HTML file (e.g., `index.html` or other HTML files).
2. If the header or footer in the target HTML file differs from the template, it replaces them with the ones from the template.
3. If a header or footer is missing in the target HTML file, it will insert the missing section.
4. The `href` links in the target HTML file are not altered. They remain intact and unchanged, ensuring no broken links or misdirected navigation.
5. If the target HTML file is empty, the entire content of the template file is copied over to the target file.
