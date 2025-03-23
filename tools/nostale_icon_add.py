import os

# Define source folder and the path of the JavaScript file to update
icons_folder = '../images/public/icons/nostale/'  # Path to the folder containing icons
js_file_path = '../scripts/icon-loader-nostale.js'  # Path to your JavaScript file

def generate_icon_lines(icons_folder):
    """
    Traverse the icons folder and all subfolders to generate lines of icon mappings
    for the JavaScript file, adding comments only when the folder changes.
    Also, renames any file that contains '¤' or spaces in its name.
    """
    icon_lines = []
    last_folder = None  # Keep track of the last folder processed

    # Traverse the directory and find all the image files in subfolders
    for root, dirs, files in os.walk(icons_folder):
        for file in files:
            # Consider only image files (GIF, WebP, etc.)
            if file.endswith(('gif', 'webp')):
                original_file_name = file
                
                # Check if the file name contains the '¤' symbol
                if '¤' in file:
                    # Rename the file by removing the '¤' symbol
                    new_file_name = file.replace('¤', '')
                    old_file_path = os.path.join(root, file)
                    new_file_path = os.path.join(root, new_file_name)
                    os.rename(old_file_path, new_file_path)  # Rename the file on the filesystem
                    file = new_file_name  # Update the file name to the new one
                
                # Check if the file name contains spaces and remove spaces in the filename
                if ' ' in file:
                    # Rename the file by removing spaces
                    new_file_name = file.replace(' ', '')
                    old_file_path = os.path.join(root, file)
                    new_file_path = os.path.join(root, new_file_name)
                    os.rename(old_file_path, new_file_path)  # Rename the file on the filesystem
                    file = new_file_name  # Update the file name to the new one

                # Extract the relative path from the icons folder
                relative_path = os.path.relpath(root, icons_folder)
                
                # Ensure the relative path ends with '/'
                if relative_path != '.':
                    relative_path += '/'
                
                # If the folder changes, add a comment indicating the new folder
                if relative_path != last_folder:
                    icon_lines.append(f"    // Icons from folder: {relative_path}")
                    last_folder = relative_path
                
                # Create the icon name (without extension) as the key
                icon_name = file.split('.')[0]

                # Remove spaces in the icon name for the JS mapping
                icon_name = icon_name.replace(' ', '')

                # Format the line for this icon
                icon_line = f'    ":{icon_name}:": "/images/public/icons/nostale/{relative_path}{file}",'
                icon_lines.append(icon_line)

    return icon_lines

def update_js_file(js_file_path, icon_lines):
    """
    Update the JavaScript file by completely replacing the imageMap with a new one
    generated from the icons in the folder, and adding subfolder comments only when the folder changes.
    """
    try:
        with open(js_file_path, 'r') as file:
            js_content = file.readlines()

        # Find the position where the imageMap is defined
        image_map_start = None
        image_map_end = None
        for i, line in enumerate(js_content):
            if line.strip().startswith('const imageMap = {'):
                image_map_start = i
            if image_map_start is not None and line.strip() == '};':
                image_map_end = i
                break
        
        if image_map_start is None or image_map_end is None:
            print("Error: Couldn't find the imageMap definition in the JavaScript file.")
            return

        # Replace the entire imageMap block with a new one
        new_image_map_content = [
            'const imageMap = {\n',
            "// Generated imageMap based on the icons folder\n"
        ]
        
        # Add the new icon lines to the imageMap
        for icon_line in icon_lines:
            new_image_map_content.append(icon_line + "\n")

        new_image_map_content.append('};\n')

        # Replace the old imageMap with the new one
        js_content = js_content[:image_map_start] + new_image_map_content + js_content[image_map_end + 1:]

        # Save the updated content back to the JavaScript file
        with open(js_file_path, 'w') as file:
            file.writelines(js_content)

        print(f"JavaScript file updated successfully with a new imageMap!")
    except FileNotFoundError:
        print(f"Error: The file {js_file_path} does not exist.")
    except Exception as e:
        print(f"An error occurred: {e}")

# Generate the new icon lines from the icons folder
icon_lines = generate_icon_lines(icons_folder)

# Update the JS file with the new imageMap
update_js_file(js_file_path, icon_lines)
