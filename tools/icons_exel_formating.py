import re

with open("../scripts/icon-loader-nostale.js", "r", encoding="utf-8") as file:
    js_content = file.read()

pattern = r'("(:[^:]+:)"): "(/images/public/icons/nostale/(.+?))"'

keys = []
values = []

for match in re.findall(pattern, js_content):
    keys.append(match[1]) 
    values.append("/" + match[3].strip('",'))  

print("\n".join(keys))
print("----------")
print("\n".join(values))
