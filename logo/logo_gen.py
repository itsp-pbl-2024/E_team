import matplotlib.pyplot as plt
from PIL import Image, ImageDraw, ImageFont
import numpy as np

# Create a new image with a dark background
width, height = 800, 400
background_color = (20, 20, 20)  # dark background
image = Image.new("RGB", (width, height), background_color)
draw = ImageDraw.Draw(image)

# Load a font
# font_path = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
font_path = "Arial.ttf"
font_size = 80
font = ImageFont.truetype(font_path, font_size)

# Define the text with special characters
text = "C∃ИS BR∃∀K"

# Calculate text size and position
text_width, text_height = draw.textsize(text, font=font)
text_x = (width - text_width) // 2
text_y = (height - text_height) // 2

# Draw the text with a glitch effect
draw.text((text_x, text_y), text, font=font, fill=(255, 255, 255))

# Add glitch effects
glitch_height = 10
glitch_offsets = np.random.randint(-20, 20, size=(height // glitch_height,))

for i, offset in enumerate(glitch_offsets):
    region = image.crop((0, i * glitch_height, width, (i + 1) * glitch_height))
    image.paste(region, (offset, i * glitch_height))

# Convert to numpy array for matplotlib
image_np = np.array(image)

# Plot the result
plt.figure(figsize=(10, 5))
plt.imshow(image_np)
plt.axis('off')
plt.title("C∃ИS BR∃∀K Logo Design", fontsize=20, color='white')
plt.show()
