import os
from pathlib import Path
from PIL import Image

def convert_images_to_webp(input_folder, output_folder, quality=75):
    """
    Converts all PNG and JPEG images in the input folder (including subdirectories)
    to WebP format while preserving the directory structure in the output folder.
    """
    input_path = Path(input_folder)
    output_path = Path(output_folder)
    
    if not input_path.exists():
        print(f"Input folder {input_folder} does not exist.")
        return
    
    for img_file in input_path.rglob("*.*"):  # Recursively find all files
        if img_file.suffix.lower() in ['.png', '.jpg', '.jpeg']:
            try:
                # Define output file path with preserved structure
                relative_path = img_file.relative_to(input_path)
                target_path = output_path / relative_path.parent
                target_path.mkdir(parents=True, exist_ok=True)
                
                webp_path = target_path / f"{img_file.stem}.webp"
                
                with Image.open(img_file) as img:
                    img.save(webp_path, "WEBP", quality=quality)
                    print(f"Converted: {img_file} -> {webp_path}")
            except Exception as e:
                print(f"Error converting {img_file}: {e}")

# Define paths
input_directory = "../images/private"
output_directory = "../images/public"

convert_images_to_webp(input_directory, output_directory)