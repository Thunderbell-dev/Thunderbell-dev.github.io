import os

icons_folder = '../images/public/icons/nostale/'
js_file_path = '../scripts/icon-loader-nostale.js'

def generate_icon_lines(icons_folder):
    icon_lines = []
    last_folder = None

    for root, dirs, files in os.walk(icons_folder):
        for file in files:
            if file.endswith(('gif', 'webp')):
                original_file_name = file
                
                if '¤' in file:
                    new_file_name = file.replace('¤', '')
                    old_file_path = os.path.join(root, file)
                    new_file_path = os.path.join(root, new_file_name)
                    os.rename(old_file_path, new_file_path)
                    file = new_file_name
                
                if ' ' in file:
                    new_file_name = file.replace(' ', '')
                    old_file_path = os.path.join(root, file)
                    new_file_path = os.path.join(root, new_file_name)
                    os.rename(old_file_path, new_file_path)
                    file = new_file_name

                relative_path = os.path.relpath(root, icons_folder)
                if relative_path != '.':
                    relative_path += '/'
                
                if relative_path != last_folder:
                    icon_lines.append(f"    // Icons from folder: {relative_path}")
                    last_folder = relative_path
                
                icon_name = file.split('.')[0]
                icon_name = icon_name.replace(' ', '')
                icon_line = f'    ":{icon_name}:": "/images/public/icons/nostale/{relative_path}{file}",'
                icon_lines.append(icon_line)

    return icon_lines

def update_js_file(js_file_path, icon_lines):
    try:
        with open(js_file_path, 'r') as file:
            js_content = file.readlines()

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

        new_image_map_content = [
            'const imageMap = {\n'
        ]
        
        for icon_line in icon_lines:
            new_image_map_content.append(icon_line + "\n")

        new_image_map_content.append('};\n')

        js_content = js_content[:image_map_start] + new_image_map_content + js_content[image_map_end + 1:]

        with open(js_file_path, 'w') as file:
            file.writelines(js_content)

        print(f"JavaScript file updated successfully with a new imageMap!")
    except FileNotFoundError:
        print(f"Error: The file {js_file_path} does not exist.")
    except Exception as e:
        print(f"An error occurred: {e}")

icon_lines = generate_icon_lines(icons_folder)
update_js_file(js_file_path, icon_lines)
