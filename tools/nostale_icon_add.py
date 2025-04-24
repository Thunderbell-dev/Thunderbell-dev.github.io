import os

icons_folder = '../images/public/icons/nostale/'
output_folder = '../scripts/iconloaders/'

os.makedirs(output_folder, exist_ok=True)

def sanitize_filename(file):
    return file.replace('¤', '').replace(' ', '')

def generate_icon_map_files(icons_folder, output_folder):
    for root, dirs, files in os.walk(icons_folder):
        relative_path = os.path.relpath(root, icons_folder).replace('\\', '/')
        if relative_path == '.':
            continue

        icons = []
        for file in files:
            if file.endswith(('gif', 'webp')):
                clean_file = sanitize_filename(file)
                if file != clean_file:
                    os.rename(os.path.join(root, file), os.path.join(root, clean_file))
                    file = clean_file

                icon_name = os.path.splitext(file)[0]
                web_path = f"/images/public/icons/nostale/{relative_path}/{file}"
                icons.append(f'    ":{icon_name}:": "{web_path}",')

        if icons:
            category = relative_path.replace('/', '_')
            js_path = os.path.join(output_folder, f"iconLoader-nostale_{category}.js")

            with open(js_path, 'w', encoding='utf-8') as f:
                f.write(f"const imageMap_{category} = {{\n")
                f.write('\n'.join(icons))
                f.write("\n};\n\n")
                f.write(f'document.addEventListener("guideLoaded", function () {{\n')
                f.write(f'    replaceTextWithImages(imageMap_{category});\n')
                f.write("});\n")

            print(f"{js_path} erstellt.")

generate_icon_map_files(icons_folder, output_folder)
