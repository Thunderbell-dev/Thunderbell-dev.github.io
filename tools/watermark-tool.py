from PIL import Image, ImageDraw, ImageFont
import os

# Function to create a repeated, diagonal text watermark
def create_text_watermark(base_image_size, text, margin=20):
    base_width, base_height = base_image_size
    
    # Create an empty image to draw the watermark on
    watermark_image = Image.new("RGBA", (base_width * 2, base_height * 2), (0, 0, 0, 0))  # Increase canvas size
    
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
    rotated_text = Image.new("RGBA", (text_width, text_height+5))
    rotated_draw = ImageDraw.Draw(rotated_text)
    
    # Draw the text on a small image (this is used to rotate the text)
    rotated_draw.text((0, 0), text, font=font, fill=(255, 255, 255, 150))  # Semi-transparent white text
    
    # Rotate the text
    rotated_text = rotated_text.rotate(angle, expand=1)
    
    # Create watermark and repeat text across the entire image, including beyond the image bounds
    x_offset = -1000  # Start from the left side of the image, allowing overflow
    y_offset = -1000  # Start from the top of the image, allowing overflow
    while y_offset < base_height * 2:  # Now extending vertically beyond the image
        while x_offset < base_width * 2:  # Now extending horizontally beyond the image
            # Paste the rotated text on the image at the current position
            watermark_image.paste(rotated_text, (x_offset, y_offset), rotated_text)
            x_offset += text_width - text_width // 6  # Add margin to the right of the text (reduce this margin)
        x_offset = -1000  # Reset to the start of the next row
        y_offset += text_height + margin * 2  # Add margin below the text (reduce this margin)
    
    # Crop to original image size
    watermark_image = watermark_image.crop((0, 0, base_width, base_height))  # Now crop back to original size
    
    return watermark_image

# Function to add the watermark (repeated text) to the original image
def add_text_watermark(input_image_path, output_image_path, text, margin=20):
    # Open the original image
    original_image = Image.open(input_image_path).convert("RGBA")
    
    # Create the text watermark image
    watermark = create_text_watermark(original_image.size, text, margin)
    
    # Overlay the watermark on the original image
    watermarked_image = Image.alpha_composite(original_image, watermark)
    
    # Save the resulting image
    watermarked_image.save(output_image_path)

# Function to add watermark manually (one image at a time)
def process_single_image(input_image_path, output_image_path, name, year, margin=20):
    # Format the watermark text
    watermark_text = f"©{name}•Purrfactory•{year}"
    
    # Add the watermark and save the image
    add_text_watermark(input_image_path, output_image_path, watermark_text, margin)
    print(f"Watermarked image saved to: {output_image_path}")

# Continuous loop to process images until stopped manually
while True:
    input_image_path = "../images/new-pictures/"+ input("Picture name (with extension): ")
    output_image_path = "../images/watermark-pictures/new_watermarked.webp"
    name = "Their name"  # Replace with dynamic name if needed
    year = 2025          # Replace with dynamic year if needed
    margin = 20
    
    process_single_image(input_image_path, output_image_path, name, year, margin)
    
    # Ask user if they want to process another image
    continue_processing = input("Do you want to process another image? (yes/no): ").lower()
    if continue_processing != "yes":
        break
