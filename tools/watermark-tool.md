# Watermark Image Script

## Overview

This Python script adds a circular watermark to all images in a specified input folder. The watermark is an image file with transparency and is placed in the bottom-right corner of each image. The watermark is resized relative to the smaller dimension of the image and adjusted for transparency.

## Requirements

Before running the script, make sure you have the following requirements:

- Python 3.x
- `Pillow` library for image processing

## Script Description

### Functionality:

1. **Circular Watermark Creation**: 

   - The watermark is loaded as an image with transparency (PNG format).
   - The watermark is resized to 20% of the smaller dimension of each original image to ensure that it doesn't become too large.
   - The watermark is made circular by creating a mask and applying it to the watermark.
   - The watermark's transparency is adjusted to 70% opacity for subtlety.  

2. **Apply Watermark**:
   - The watermark is added to the bottom-right corner of each image.
   - The watermark is pasted with transparency maintained, so it blends naturally over the original image.

3. **Processing Multiple Images**:
   - The script processes all image files in a specified input folder (supports PNG, JPG, JPEG).
   - Each processed image is saved to a new output folder with the watermark applied.

### How it Works

1. **Input Folder**: The script reads all image files (PNG, JPG, JPEG) from a specified input folder.
2. **Watermark**: A watermark image file (usually a transparent PNG) is applied to each image.
3. **Output Folder**: The watermarked images are saved into a specified output folder with the same file names.

### Steps

1. Load each image from the input folder.
2. Apply a circular watermark with adjusted transparency to the bottom-right corner.
3. Save the watermarked images to the output folder.

## Configuration

You need to modify the following paths in the script according to your project setup:

- `input_folder`: Path to the folder containing your original images.
- `output_folder`: Path to the folder where the watermarked images will be saved.
- `watermark_image_path`: Path to the transparent watermark image (PNG format).

```python
input_folder = '../images/new-pictures'  # Folder containing the images
output_folder = '../images/watermark-pictures'  # Folder to save the new images
watermark_image_path = '../images/watermark/purrfactory-watermark.png'  # Watermark image
```

## How to Run the Script

1. Ensure that the necessary Python libraries are installed (Pillow).
2. Modify the folder paths in the script to match your input and output directories.
3. Run the script using the following command:

```bash
python watermark-tool.py
```

Once executed, the script will process all images in the input folder and save the watermarked images to the output folder.

## Example Workflow

1. **Original Images** (input folder):  
   - `image1.jpg`
   - `image2.png`
   - `image3.jpeg`

2. **Watermarked Images** (output folder):  
   - `image1.jpg` (with circular watermark at the bottom-right)
   - `image2.png` (with circular watermark at the bottom-right)
   - `image3.jpeg` (with circular watermark at the bottom-right)

## Customization

- **Watermark Size**: The watermark is resized based on the smaller dimension (width or height) of the original image. You can adjust the size by changing the scaling factor in the script.
  
- **Transparency**: The transparency of the watermark can be adjusted by changing the enhancement factor (`0.7` in the script). A value closer to `0` will make the watermark more transparent, while a value closer to `1` will make it less transparent.  
