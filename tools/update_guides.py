import os
import json
from bs4 import BeautifulSoup

def update_guides():
    def update_guides_json(guides_folder, json_file):
        # Get all guide files in the folder
        guides = [f for f in os.listdir(guides_folder) if f.endswith(".html")]

        if not guides:
            print("No guides found. Aborting update.")
            return

        # Create a list to hold guide data
        guides_data = {"guides": []}

        for guide_file in guides:
            guide_path = os.path.join(guides_folder, guide_file)

            # Open each guide file and parse the title (name)
            with open(guide_path, "r", encoding="utf-8") as file:
                content = file.read()
                soup = BeautifulSoup(content, "html.parser")

                # Find the first <h1> tag to use as the name
                guide_name = soup.find("h1").get_text() if soup.find("h1") else guide_file

                # Find all <h2> and <h3> tags to treat as chapters
                chapters = []

                # Find all <h2> and <h3> tags to list as chapters
                for heading in soup.find_all(["h2", "h3"]):
                    chapter_name = heading.get_text().strip()
                    # Get the 'id' attribute of the heading, if it exists
                    chapter_id = heading.get("id", None)
                    
                    # If an id is present, use it; otherwise, use a generic id (e.g., 'chapter1', 'chapter2')
                    if not chapter_id:
                        chapter_id = f"chapter{len(chapters) + 1}"
                    
                    chapters.append({
                        "name": chapter_name,
                        "id": chapter_id
                    })

            # Add the guide data to the list
            guides_data["guides"].append({
                "name": guide_name,
                "path": guide_file,
                "chapters": chapters
            })

        # Write the updated JSON data to the file
        with open(json_file, "w", encoding="utf-8") as file:
            json.dump(guides_data, file, indent=4)

        print(f"Generated {json_file} successfully with {len(guides)} guides.")

    guides_folder_path = "../pages/guides/guides-html"
    json_file_path = "../pages/guides/guides.json"
    update_guides_json(guides_folder_path, json_file_path)

update_guides()
