import os
from pathlib import Path
from PIL import Image, ImageSequence
import imageio
import shutil

def sanitize_filename(file_path):
    new_name = file_path.name.replace('¤', '').replace(' ', '').replace('·', '')
    new_path = file_path.parent / new_name
    if new_path != file_path:
        file_path.rename(new_path)
    return new_path

def resize_gif_and_convert_to_webp(input_gif_path, output_webp_path, duration_multiplier=100):
    with Image.open(input_gif_path) as im:
        frames = []
        durations = []
        for frame in ImageSequence.Iterator(im):
            resized_frame = frame.convert("RGBA").resize((32, 32), Image.LANCZOS)
            frames.append(resized_frame)
            frame_duration = frame.info.get('duration', 100)
            durations.append(frame_duration * duration_multiplier)
        imageio.mimsave(output_webp_path, frames, duration=[d / 1000 for d in durations], format='WEBP')
        print(f"✅ Converted GIF to WebP with extended duration: {output_webp_path}")

def convert_images_to_webp(input_folder, output_folder, quality=75, duration_multiplier=100):
    input_path = Path(input_folder)
    output_path = Path(output_folder)

    if not input_path.exists():
        print(f"Input folder {input_folder} does not exist.")
        return

    for img_file in input_path.rglob("*.*"):
        try:
            img_file = sanitize_filename(img_file)
            relative_path = img_file.relative_to(input_path)
            target_path = output_path / relative_path.parent
            target_path.mkdir(parents=True, exist_ok=True)

            stem = img_file.stem
            ext = img_file.suffix.lower()

            webp_path = target_path / f"{stem}.webp"

            if ext == '.webp':
                if webp_path.exists():
                    print(f"⏭️ Skipped (WebP already exists): {img_file}")
                else:
                    shutil.copy(img_file, webp_path)
                    print(f"✅ Copied WebP file: {img_file} -> {webp_path}")
                continue

            if webp_path.exists():
                print(f"⏭️ Skipped (WebP already exists): {img_file}")
                continue

            if ext == '.gif' and 'icons' in img_file.parts:
                resize_gif_and_convert_to_webp(img_file, webp_path, duration_multiplier)

            elif ext in ['.png', '.jpg', '.jpeg']:
                with Image.open(img_file) as img:
                    img.save(webp_path, "WEBP", quality=quality)
                    print(f"✅ Converted image to WebP: {img_file} -> {webp_path}")

            elif ext == '.gif':
                shutil.copy(img_file, target_path / img_file.name)
                print(f"✅ Copied GIF file: {img_file} -> {target_path / img_file.name}")

        except Exception as e:
            print(f"❌ Error processing {img_file}: {e}")

input_directory = "../../purrfactory-backup/images/"
output_directory = "../images/public"

convert_images_to_webp(input_directory, output_directory, quality=75, duration_multiplier=1200)
