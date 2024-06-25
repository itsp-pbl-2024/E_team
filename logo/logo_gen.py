import matplotlib.pyplot as plt
from PIL import Image, ImageDraw, ImageFont
import numpy as np

np.random.seed(103)
dark_mode = 0

# Create a new image with a dark background
width, height = 800, 400
background_color = (0, 0, 0, 1)
image = Image.new("RGBA", (width, height), background_color)
draw = ImageDraw.Draw(image)

# Load a font
font_path = "DejaVuSans-Bold.ttf"
font_size = 80
font = ImageFont.truetype(font_path, font_size)

# Define the text with special characters
text = "C∃ИS BR∃∀K"

# Calculate text size and position
text_width, text_height = draw.textsize(text, font=font)
text_x = (width - text_width) // 2
text_y = (height - text_height) // 2

if dark_mode:
    draw.text((text_x, text_y), text, font=font, fill=(255, 255, 255))
else:
    draw.text((text_x, text_y), text, font=font, fill=(0, 0, 0))


# Add a subtle glitch effect
glitch_height = 10
glitch_offsets = np.random.randint(-5, 5, size=(height // glitch_height,))

for i, offset in enumerate(glitch_offsets):
    region = image.crop((0, i * glitch_height, width, (i + 1) * glitch_height))
    image.paste(region, (offset, i * glitch_height))

bbox = draw.textbbox((text_x, text_y), text, font=font)
cropped_image = image.crop(bbox)

if dark_mode:
    cropped_image.save('logo_dark.png')
else:
    cropped_image.save('logo.png')