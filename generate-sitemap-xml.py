import json
from datetime import datetime

# Завантажуємо JSON
with open("site-map.json", "r", encoding="utf-8") as f:
    pages = json.load(f)

# Створюємо XML-заголовок
xml = ['<?xml version="1.0" encoding="UTF-8"?>']
xml.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')

for path in pages:
    xml.append("  <url>")
    xml.append(f"    <loc>https://serghiilimborskyi.github.io/AgroProsper/{path}</loc>")
    xml.append(f"    <lastmod>{datetime.utcnow().date()}</lastmod>")
    xml.append("    <changefreq>monthly</changefreq>")
    xml.append("    <priority>0.8</priority>")
    xml.append("  </url>")

xml.append("</urlset>")

# Зберігаємо у sitemap.xml
with open("sitemap.xml", "w", encoding="utf-8") as f:
    f.write("\n".join(xml))

print("✅ sitemap.xml створено успішно!")
