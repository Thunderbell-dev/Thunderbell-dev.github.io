def extract_section(html, section_tag):
    """Extract the header or footer section from the HTML."""
    start_tag = f"<{section_tag}>"
    end_tag = f"</{section_tag}>"
    
    # Find the start and end positions of the section
    start_pos = html.find(start_tag)
    end_pos = html.find(end_tag, start_pos)
    
    if start_pos == -1 or end_pos == -1:
        print(f"{section_tag} not found.")
        return None  # Return None if section is not found
    
    # Extract the section content
    section_content = html[start_pos:end_pos + len(end_tag)]
    return section_content

def replace_section(html, old_section, new_section):
    """Replace the old section in the HTML with the new section."""
    if old_section:
        return html.replace(old_section, new_section)
    else:
        # If the section is missing, we need to insert the new section into the right place
        if new_section.startswith("<header>"):
            return html.replace('<body>', f'{new_section}\n<body>')
        elif new_section.startswith("<footer>"):
            return html.replace('</body>', f'{new_section}\n</body>')

        return html

def apply_changes_to_html(file1, file2):
    """Read files, extract sections, and apply changes."""
    try:
        with open(file1, 'r', encoding='utf-8') as f1:
            html1 = f1.read()
    except Exception as e:
        print(f"Error reading {file1}: {e}")
        return

    try:
        with open(file2, 'r', encoding='utf-8') as f2:
            html2 = f2.read()
    except Exception as e:
        print(f"Error reading {file2}: {e}")
        return

    # If the file2 is empty, just copy the entire content from file1 to file2
    if not html2.strip():  # Check if the file is empty (only whitespace)
        print(f"{file2} is empty. Copying content from {file1} to {file2}...")
        html2 = html1
    else:
        # Extract header and footer from site.html (template)
        header1 = extract_section(html1, 'header')
        footer1 = extract_section(html1, 'footer')

        # Extract header and footer from index.html (target)
        header2 = extract_section(html2, 'header')
        footer2 = extract_section(html2, 'footer')

        # If header2 or footer2 are None (not found), we should insert the content from header1/footer1.
        if header2 is None:  # If header is missing, insert it
            print("Header not found. Inserting header...")
            html2 = html2.replace('<body>', f'{header1}\n<body>')
        elif header1 != header2:  # Replace if header is different
            print("Header is different. Replacing header...")
            html2 = replace_section(html2, header2, header1)

        if footer2 is None:  # If footer is missing, insert it
            print("Footer not found. Inserting footer...")
            html2 = html2.replace('</body>', f'{footer1}\n</body>')
        elif footer1 != footer2:  # Replace if footer is different
            print("Footer is different. Replacing footer...")
            html2 = replace_section(html2, footer2, footer1)

    # Here we skip modifying the hrefs and just write back the updated html
    try:
        with open(file2, 'w', encoding='utf-8') as f2_updated:
            f2_updated.write(html2)
        print(f"Changes from {file1} have been applied to {file2}.")
    except Exception as e:
        print(f"Error writing to {file2}: {e}")
