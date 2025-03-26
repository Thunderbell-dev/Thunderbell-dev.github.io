import re

# Read the content of the JavaScript file
with open("../scripts/icon-loader-nostale.js", "r", encoding="utf-8") as file:
    js_content = file.read()

# Define the regex pattern to match the required data
pattern = r'("(:[^:]+:)"): "(/images/public/icons/nostale/(.+?))"'

# Initialize lists to store the keys and values
keys = []
values = []

# Find all matches and separate the keys and values
for match in re.findall(pattern, js_content):
    keys.append(match[1])  # Collect keys (the part after ":")
    values.append("/" + match[3].strip('",'))  # Collect values (the icon paths)

# Write the keys to a file
with open("keys_output.txt", "w", encoding="utf-8") as keys_file:
    keys_file.write("\n".join(keys))

# Write the values to a file
with open("values_output.txt", "w", encoding="utf-8") as values_file:
    values_file.write("\n".join(values))

print("Keys and values have been written to 'keys_output.txt' and 'values_output.txt'.")
