import os
import json
from bs4 import BeautifulSoup

def update_guides():
    def update_guides_json(guides_folder, json_file):
        guides = [f for f in os.listdir(guides_folder) if f.endswith(".html")]

        if not guides:
            print("No guides found. Aborting update.")
            return

        guides_data = {"guides": []}

        for guide_file in guides:
            guide_path = os.path.join(guides_folder, guide_file)

            with open(guide_path, "r", encoding="utf-8") as file:
                content = file.read()
                soup = BeautifulSoup(content, "html.parser")

                # Name aus <h1>
                guide_name = soup.find("h1").get_text().strip() if soup.find("h1") else guide_file

                # Kategorie aus <meta name="category" content="...">
                category_meta = soup.find("meta", attrs={"name": "category"})
                category = category_meta["content"].strip() if category_meta else "Uncategorized"

                # Kapitel aus <h2>
                chapters = []
                for heading in soup.find_all("h2"):
                    chapter_name = heading.get_text().strip()
                    chapter_id = heading.get("id") or f"chapter{len(chapters) + 1}"
                    chapters.append({
                        "name": chapter_name,
                        "id": chapter_id
                    })

            # Guide-Objekt inklusive Kategorie speichern
            guides_data["guides"].append({
                "name": guide_name,
                "path": guide_file,
                "category": category,
                "chapters": chapters
            })

        # JSON schreiben
        with open(json_file, "w", encoding="utf-8") as file:
            json.dump(guides_data, file, indent=4)

        print(f"Generated {json_file} successfully with {len(guides)} guides.")

    guides_folder_path = "../pages/guides/guides-html"
    json_file_path = "../pages/guides/guides.json"
    update_guides_json(guides_folder_path, json_file_path)

update_guides()
