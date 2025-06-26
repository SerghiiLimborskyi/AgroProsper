import os
import json
from datetime import date

ROOT_DIR = "./"  # Корінь проєкту
BASE_URL = "https://serghiilimborskyi.github.io/AgroProsper"

pages = []

for root, dirs, files in os.walk(ROOT_DIR):
    for file in files:
        if file.endswith(".html"):
            path = os.path.join(root, file).replace("\\", "/").replace("./", "")
            url = "/" + path
            pages.append({
                "url": url,
                "title": file.replace(".html", "").capitalize(),
                "changefreq": "monthly",
                "priority": 0.5
            })

site_map = {
    "domain": BASE_URL,
    "generated": str(date.today()),
    "pages": pages
}

with open("site-map.json", "w", encoding="utf-8") as f:
    json.dump(site_map, f, indent=2, ensure_ascii=False)

print("✅ site-map.json оновлено!")
