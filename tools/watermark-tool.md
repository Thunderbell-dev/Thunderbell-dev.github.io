# Watermark-tool

This Python script is designed to apply a repeated, diagonal text watermark to an image. The watermark includes a copyright symbol, a name (like the creator's name), and a year. Here's a breakdown of the script's key components:

## 1. **create_text_watermark function**

- **Purpose**: This function generates a watermark image with repeating diagonal text.
- **Parameters**:
  - `base_image_size`: Size of the base image (width and height).
  - `text`: The text to be used as the watermark (like "©Name•Purrfactory•2025").
  - `margin`: A margin between the text elements (default 20).
- **Steps**:
  - Creates a larger canvas (`watermark_image`) to fit repeated text beyond the base image bounds (twice the original size in both dimensions).
  - Uses the `ImageFont.truetype` function to set the font. If `arial.ttf` is not found, it falls back to the default font.
  - The text is drawn on a rotated canvas at a 45-degree angle, ensuring a diagonal pattern.
  - The rotated text is then pasted across the larger image, with each repetition spaced out by a calculated margin.
  - After filling the large canvas with repeated text, the image is cropped back to the original size.

## 2. **add_text_watermark function**

- **Purpose**: This function combines the original image with the watermark generated in `create_text_watermark`.
- **Parameters**:
  - `input_image_path`: The path to the original image.
  - `output_image_path`: The path where the watermarked image will be saved.
  - `text`: The watermark text.
  - `margin`: The margin between repeated watermarks.
- **Steps**:
  - Opens the input image and converts it to RGBA (to handle transparency).
  - Calls `create_text_watermark` to generate the watermark.
  - The watermark is overlaid onto the original image using `Image.alpha_composite`.
  - The result is saved as a `.webp` file.

## 3. **process_single_image function**

- **Purpose**: A convenience function to generate a watermark with custom text (including name and year) and apply it to a single image.
- **Parameters**:
  - `input_image_path`: The path to the image to be watermarked.
  - `output_image_path`: The destination path for the watermarked image.
  - `name`: The name to be included in the watermark.
  - `year`: The year to be included in the watermark.
  - `margin`: The space between repeated watermarks.
- **Steps**:
  - It formats the watermark text (e.g., `©Name•Purrfactory•2025`).
  - It then calls `add_text_watermark` to apply the watermark.
  - The image is saved at the specified `output_image_path`.

## 4. **Continuous Loop to Process Multiple Images**

- **Purpose**: The script prompts the user to input the name of an image file and then processes it by applying the watermark.
- **Steps**:
  - In an infinite loop, the user is prompted to input the filename of the image to watermark.
  - The `process_single_image` function is called to add the watermark.
  - After processing, the user is asked if they want to process another image. If the user answers "yes," it repeats; otherwise, it breaks out of the loop.

## Summary

- This script adds a repeating, diagonal watermark to images. The watermark includes customizable text (name, year, etc.) and can be applied to one image at a time.
- The watermark text is rotated, creating a diagonal pattern across the image.
- The user is prompted to process multiple images in a loop, making it suitable for batch processing images.
