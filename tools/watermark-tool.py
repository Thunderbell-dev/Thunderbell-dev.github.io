from PIL import Image, ImageDraw, ImageEnhance
import os

# Function to create a circular watermark with adjusted transparency
def create_round_watermark(watermark_image_path, base_image_size):
    # Open the watermark image
    watermark = Image.open(watermark_image_path).convert("RGBA")
    
    # Scale the watermark to fit the image dimensions (based on the smaller dimension of the original image)
    base_width, base_height = base_image_size
    watermark_size = min(base_width, base_height) // 5  # watermark will be 20% of the smaller dimension
    
    # Resize watermark maintaining its aspect ratio
    watermark = watermark.resize((watermark_size, watermark_size), Image.Resampling.LANCZOS)

    # Create a mask for the circular watermark
    mask = Image.new("L", (watermark_size, watermark_size), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, watermark_size, watermark_size), fill=255)  # Draw a filled circle

    # Apply the mask to the watermark to make it round and keep transparency
    round_watermark = Image.new("RGBA", (watermark_size, watermark_size))
    round_watermark.paste(watermark, (0, 0), mask)
    
    # Adjust the transparency of the watermark (optional)
    alpha = round_watermark.split()[3]  # Get the alpha channel
    alpha = ImageEnhance.Brightness(alpha).enhance(0.7) 
    round_watermark.putalpha(alpha)
    
    return round_watermark

# Function to add the circular watermark to the original image
def add_watermark(input_image_path, watermark_image_path, output_image_path):
    # Open the original image
    original_image = Image.open(input_image_path)
    original_image = original_image.convert("RGBA")  # Convert to RGBA to support transparency
    
    # Create the round watermark image
    watermark = create_round_watermark(watermark_image_path, original_image.size)

    # Calculate watermark position (bottom-right corner with padding)
    watermark_position = (original_image.width - watermark.width - 10, original_image.height - watermark.height - 10)

    # Paste the watermark onto the original image
    original_image.paste(watermark, watermark_position, watermark)

    # Save the resulting image
    original_image.save(output_image_path)


# Folder paths
input_folder = '../images/new-pictures'  # Folder containing the images
output_folder = '../images/watermark-pictures'  # Folder to save the new images
watermark_image_path = '../images/watermark/purrfactory-watermark.png'  # Watermark image


# Create the output folder if it doesn't exist
if not os.path.exists(output_folder):
    os.makedirs(output_folder)

# Loop through all files in the input folder
for filename in os.listdir(input_folder):
    input_image_path = os.path.join(input_folder, filename)
    
    # Check if the file is an image (PNG, JPG, JPEG)
    if filename.lower().endswith(('png', 'jpg', 'jpeg')):
        # Path for the new image with watermark
        output_image_path = os.path.join(output_folder, filename)

        # Add watermark and save the new image
        add_watermark(input_image_path, watermark_image_path, output_image_path)

print("All images have been successfully watermarked with a round, transparent watermark.")
