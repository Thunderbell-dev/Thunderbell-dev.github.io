from PIL import Image, ImageDraw, ImageFont
import os

# Function to create a repeated, diagonal text watermark
def create_text_watermark(base_image_size, text):
    base_width, base_height = base_image_size
    
    # Create an empty image to draw the watermark on
    watermark_image = Image.new("RGBA", (base_width, base_height), (0, 0, 0, 0))
    
    # Initialize the drawing context
    draw = ImageDraw.Draw(watermark_image)
    
    # Choose a smaller font (adjust font size here)
    try:
        font = ImageFont.truetype("arial.ttf", 30)  # Smaller text
    except IOError:
        font = ImageFont.load_default()  # Fallback to default if Arial is not available
    
    # Calculate text width and height
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width, text_height = bbox[2] - bbox[0], bbox[3] - bbox[1]
    
    # Set the angle of rotation (45 degrees)
    angle = 45
    rotated_text = Image.new("RGBA", (text_width, text_height))
    rotated_draw = ImageDraw.Draw(rotated_text)
    
    # Draw the text on a small image (this is used to rotate the text)
    rotated_draw.text((0, 0), text, font=font, fill=(255, 255, 255, 128))  # Semi-transparent white text
    
    # Rotate the text
    rotated_text = rotated_text.rotate(angle, expand=1)
    
    # Create watermark and repeat text across the entire image, including beyond the image bounds
    x_offset = 0
    y_offset = 0
    while y_offset < base_height + text_height:  # Go beyond the height of the image
        while x_offset < base_width + text_width:  # Go beyond the width of the image
            # Paste the rotated text on the image at the current position
            watermark_image.paste(rotated_text, (x_offset, y_offset), rotated_text)
            x_offset += text_width  # Move the position to the right by the text width
        x_offset = 0  # Reset to the start of the next row
        y_offset += text_height  # Move the position down by the text height
    
    return watermark_image

# Function to add the watermark (repeated text) to the original image
def add_text_watermark(input_image_path, output_image_path, text):
    # Open the original image
    original_image = Image.open(input_image_path).convert("RGBA")
    
    # Create the text watermark image
    watermark = create_text_watermark(original_image.size, text)
    
    # Overlay the watermark on the original image
    watermarked_image = Image.alpha_composite(original_image, watermark)
    
    # Save the resulting image
    watermarked_image.save(output_image_path)

# Function to add watermark manually (one image at a time)
def process_single_image(input_image_path, output_image_path, name, year):
    # Format the watermark text
    watermark_text = f"{name} + Purrfactory + {year}"
    
    # Add the watermark and save the image
    add_text_watermark(input_image_path, output_image_path, watermark_text)
    print(f"Watermarked image saved to: {output_image_path}")

# Continuous loop to process images until stopped manually
while True:
    input_image_path = "../images/new-pictures/"+ input("Picture name (with extension): ")
    output_image_path = "../images/watermark-pictures/new_watermarked.webp"
    name = "Their name"  # Replace with dynamic name if needed
    year = 2025          # Replace with dynamic year if needed
    
    process_single_image(input_image_path, output_image_path, name, year)
    
    # Ask user if they want to process another image
    continue_processing = input("Do you want to process another image? (yes/no): ").lower()
    if continue_processing != "yes":
        break
