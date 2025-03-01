from apply_header_footer import apply_changes_to_html
import os

def apply_changes_to_all_index_html(base_directory, template_file):
    """Apply changes to all index.html files in the base directory and subdirectories."""
    for root, dirs, files in os.walk(base_directory):
        if 'index.html' in files:
            index_file = os.path.join(root, 'index.html')
            print(f"Applying changes to {index_file}...")
            apply_changes_to_html(template_file, index_file)

# Define your template file and base directory
template_file = '../templates/site.html'  # The template file
base_directory = '../'  # The base directory to search for index.html files

# Apply the changes to all index.html files in the base directory and subdirectories
apply_changes_to_all_index_html(base_directory, template_file)