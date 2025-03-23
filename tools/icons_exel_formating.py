import re

# Read the JavaScript file
with open("../scripts/icon-loader-nostale.js", "r", encoding="utf-8") as file:
    js_content = file.read()

# Regular expression to match keys and values
# This pattern captures any key within : : (e.g., :SP1A:, :Ginseng:) and the corresponding value (image path)
pattern = r'("(:[^:]+:)"): "(/images/public/icons/nostale/(.+?))"'

# Extract keys and values
keys = []
values = []

for match in re.findall(pattern, js_content):
    keys.append(match[1])  # Extracted key (e.g., ":SP1A:" or ":Ginseng:")
    values.append("/" + match[3].strip('",'))  # Extracted relative path (e.g., /Archer/¤SP1A.gif)


print("\n".join(keys))
print("----------")
print("\n".join(values))
