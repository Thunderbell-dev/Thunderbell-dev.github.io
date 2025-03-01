from PIL import Image
import os

# Function to add the watermark to an image
def add_watermark(input_image_path, watermark_image_path, output_image_path):
    # Open the original image and the watermark image
    original_image = Image.open(input_image_path)
    watermark = Image.open(watermark_image_path)

    # Resize watermark (optional)
    watermark = watermark.resize((original_image.width // 4, original_image.height // 4))

    # Position of the watermark (bottom right corner)
    watermark_position = (original_image.width - watermark.width - 10, original_image.height - watermark.height - 10)

    # Paste the watermark on the original image (with transparency if applicable)
    original_image.paste(watermark, watermark_position, watermark)  # The last parameter is the transparency mask

    # Save the edited image
    original_image.save(output_image_path)

# Folder paths
input_folder = '../images/new-pictures'  # Folder containing the images
output_folder = '../images/watermark-pictures'  # Folder to save the new images
watermark_image_path = '../images/watermark/purrfactory-watermark.png'  # Watermark image

# Create output folder if it doesn't exist
if not os.path.exists(output_folder):
    os.makedirs(output_folder)

# Loop through all files in the input folder
for filename in os.listdir(input_folder):
    input_image_path = os.path.join(input_folder, filename)
    
    # Check if the file is an image (PNG, JPG, JPEG)
    if filename.lower().endswith(('png', 'jpg', 'jpeg')):
        # Path for the new image with watermark
        output_image_path = os.path.join(output_folder, filename)

        # Add watermark and save the image
        add_watermark(input_image_path, watermark_image_path, output_image_path)

print("All images have been successfully watermarked.")
