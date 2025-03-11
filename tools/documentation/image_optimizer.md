# Convert Images to WebP

This Python script is designed to convert all PNG and JPEG images in a specified folder (including subdirectories) to the WebP format, which is a more efficient image format that provides superior compression and quality. The script uses the **Pillow** library to handle image loading and saving.

## Features

- **Recursive Processing**: The script processes images in the given folder and all its subdirectories.
- **Folder Structure Preservation**: Maintains the original folder structure when saving converted images.
- **Quality Control**: By default, it converts images to WebP with a quality of 75 (adjustable).
- **Supports PNG and JPEG**: Only `.png`, `.jpg`, and `.jpeg` files are processed.
- **Output Folder**: Converted images are saved in a separate output folder while preserving the input folder's structure.
- **Error Handling**: If an error occurs during the conversion of any image, an error message is printed.

## Installation Requirements

- **Pillow**: Install it using `pip install Pillow`.

## Usage

- Specify the input folder containing PNG and JPEG images. The script will process all eligible images in that folder and its subdirectories.
- Converted images are saved in an output folder while maintaining the original directory structure.
- You can adjust the quality of the converted WebP images by changing the `quality` parameter (default is 75).

```python
convert_images_to_webp("../images/private", "../images/public", quality=80)
```

### Example Usage

```python
convert_images_to_webp("path/to/input/folder", "path/to/output/folder")
```

### Parameters

- `input_folder`: The path to the folder containing the images to convert.
- `output_folder`: The path to the folder where converted images will be saved.
- `quality`: (Optional) The quality of the output WebP images (default is 75).

The script will print the status of each image conversion or any errors encountered during the process.