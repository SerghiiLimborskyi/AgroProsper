import os
import json
from datetime import datetime

# 🔧 Налаштування
base_url = "https://serghiilimborskyi.github.io/AgroProsper/"
output_json = "site-map.json"
output_xml = "sitemap.xml"

# 📁 Збираємо HTML-файли
site_pages = []
for root, dirs, files in os.walk("."):
    for file in files:
        if file.endswith(".html") and not file.startswith("template"):
            path = os.path.join(root, file).replace("\\", "/").lstrip("./")
            site_pages.append(path)

# 💾 Зберігаємо site-map.json
with open(output_json, "w", encoding="utf-8") as f:
    json.dump(site_pages, f, indent=2, ensure_ascii=False)

# 🧱 Створюємо sitemap.xml
xml = ['<?xml version="1.0" encoding="UTF-8"?>']
xml.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')

for page in site_pages:
    xml.append("  <url>")
    xml.append(f"    <loc>{base_url}{page}</loc>")
    xml.append(f"    <lastmod>{datetime.utcnow().date()}</lastmod>")
    xml.append("    <changefreq>monthly</changefreq>")
    xml.append("    <priority>0.8</priority>")
    xml.append("  </url>")

xml.append("</urlset>")

with open(output_xml, "w", encoding="utf-8") as f:
    f.write("\n".join(xml))

print("✅ site-map.json та sitemap.xml оновлено успішно!")



