import os
from pathlib import Path
from PIL import Image

def convert_images_to_webp(input_folder, output_folder, quality=75):
    """
    Converts all PNG, JPEG, and GIF images in the input folder (including subdirectories)
    to WebP format while preserving the directory structure in the output folder.
    GIF and WebP files are copied directly. Existing WebP files are skipped.
    If both GIF and WebP with the same name exist, both are skipped.
    """
    input_path = Path(input_folder)
    output_path = Path(output_folder)
    
    if not input_path.exists():
        print(f"Input folder {input_folder} does not exist.")
        return
    
    for img_file in input_path.rglob("*.*"):  # Recursively find all files
        if img_file.suffix.lower() in ['.png', '.jpg', '.jpeg', '.gif', '.webp']:
            try:
                # Define output file path with preserved structure
                relative_path = img_file.relative_to(input_path)
                target_path = output_path / relative_path.parent
                target_path.mkdir(parents=True, exist_ok=True)
                
                # Output path for the WebP version
                webp_path = target_path / f"{img_file.stem}.webp"
                gif_path = target_path / f"{img_file.stem}.gif"
                
                # If both GIF and WebP files exist with the same name, skip
                if gif_path.exists() and webp_path.exists():
                    print(f"Skipped (both .gif and .webp exist with same name): {img_file}")
                    continue
                
                # If it's already a WebP, just copy it
                if img_file.suffix.lower() == '.webp':
                    target_webp_path = target_path / img_file.name
                    if target_webp_path.exists():
                        continue  # Skip the WebP file if it already exists
                    with open(img_file, 'rb') as fsrc, open(target_webp_path, 'wb') as fdst:
                        fdst.write(fsrc.read())
                    print(f"Copied: {img_file} -> {target_webp_path}")
                    continue  # Skip the conversion for WebP files
                
                # Check if the WebP file already exists (for PNG/JPEG)
                if webp_path.exists():
                    continue  # Skip if the WebP file already exists
                
                # Copy GIF files directly
                if img_file.suffix.lower() == '.gif':
                    if gif_path.exists():
                        continue  # Skip if the GIF file already exists
                    target_gif_path = target_path / img_file.name
                    with open(img_file, 'rb') as fsrc, open(target_gif_path, 'wb') as fdst:
                        fdst.write(fsrc.read())
                    print(f"Copied: {img_file} -> {target_gif_path}")
                else:
                    # Convert PNG/JPEG to WebP
                    with Image.open(img_file) as img:
                        img.save(webp_path, "WEBP", quality=quality)
                        print(f"Converted: {img_file} -> {webp_path}")
            except Exception as e:
                print(f"Error processing {img_file}: {e}")

# Define paths
input_directory = "../images/private"
output_directory = "../images/public"

convert_images_to_webp(input_directory, output_directory)
