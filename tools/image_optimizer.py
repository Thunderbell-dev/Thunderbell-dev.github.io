import os
from pathlib import Path
from PIL import Image

def convert_images_to_webp(input_folder, quality=75):
    """Converts all PNG and JPEG images in the folder to WebP format."""
    input_path = Path(input_folder)
    output_folder = input_path
    output_folder.mkdir(exist_ok=True)
    
    for img_file in input_path.iterdir():
        if img_file.suffix.lower() in ['.png', '.jpg', '.jpeg']:
            try:
                with Image.open(img_file) as img:
                    webp_path = output_folder / f"{img_file.stem}.webp"
                    img.save(webp_path, "WEBP", quality=quality)
                    print(f"Converted: {img_file.name} -> {webp_path.name}")
            except Exception as e:
                print(f"Error converting {img_file.name}: {e}")


convert_images_to_webp("../images/public")
