import os
import json

def update_guides():

    def update_guides_html(html_file, guides_folder):
        # Get all guide files in the folder
        guides = sorted([f for f in os.listdir(guides_folder) if f.endswith(".html")])

        if not guides:
            print("No guides found. Aborting update.")
            return

        # Generate new <ul> content
        ul_content = "".join(f'                <li><a href="#" onclick="loadGuide(\'{guide}\')">{guide.replace(".html", "").replace("_", " ").title()}</a></li>\n' for guide in guides)

        # Generate new <iframe> content
        first_guide = guides[0]  # Use the first guide as the default
        iframe_content = f'<iframe id="guide-frame" src="/pages/guides/guides-html/{first_guide}"></iframe>'

        # Read the existing HTML file
        with open(html_file, "r", encoding="utf-8") as file:
            html_content = file.read()

        # Replace the existing guide list
        ul_start = html_content.find("<ul>")
        ul_end = html_content.find("</ul>") + 5
        if ul_start != -1 and ul_end != -1:
            html_content = html_content[:ul_start] + "<ul>\n" + ul_content + "            </ul>" + html_content[ul_end:]

        # Replace the iframe src
        iframe_start = html_content.find("<iframe id=\"guide-frame\"")
        iframe_end = html_content.find("</iframe>") + 9
        if iframe_start != -1 and iframe_end != -1:
            html_content = html_content[:iframe_start] + iframe_content + html_content[iframe_end:]

        # Write the updated HTML file
        with open(html_file, "w", encoding="utf-8") as file:
            file.write(html_content)

        print("Guides section updated successfully.")

    def update_guides_json(guides_folder, json_file):
        # Get all guide files in the folder
        guides = [f for f in os.listdir(guides_folder) if f.endswith(".html")]

        if not guides:
            print("No guides found. Aborting update.")
            return

        # Create JSON data
        guides_data = {"guides": guides}

        # Write JSON file
        with open(json_file, "w", encoding="utf-8") as file:
            json.dump(guides_data, file, indent=4)

        print(f"Generated {json_file} successfully with {len(guides)} guides.")


    html_file_path = "../pages/guides/index.html" 
    guides_folder_path = "../pages/guides/guides-html"
    json_file_path = "../pages/guides/guides.json"
    update_guides_html(html_file_path, guides_folder_path)
    update_guides_json(guides_folder_path, json_file_path)

update_guides()









