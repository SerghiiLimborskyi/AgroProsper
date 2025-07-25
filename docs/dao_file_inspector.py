import os
import re
import shutil

HTML_PATH = "docs/🧠🧩✨studio-v6-dashboard.html"
ASSETS_DIR = "docs/assets"
MODULE_PATHS = [
    "docs/edu-module/",
    "docs/game-module/",
    "docs/video-presentations/",
    "docs/legal-module/",
    "docs/promo-deck/",
    "docs/marketing/"
]
SVG_FILE = "symbol-flow.svg"

def contains_emoji_or_special(name):
    return bool(re.search(r"[^\w\-\.\/]", name))

def safe_name(name):
    return re.sub(r"[^\w\-\.]", "_", name)

def inspect_file_structure():
    report = []
    
    # 1. Перевірка HTML-файлу
    if not os.path.exists(HTML_PATH):
        report.append(f"❌ HTML-файл не знайдено: `{HTML_PATH}`")
    elif contains_emoji_or_special(HTML_PATH):
        new_name = safe_name(HTML_PATH)
        shutil.move(HTML_PATH, new_name)
        report.append(f"⚠️ Emoji/спецсимволи в HTML-файлі — перейменовано на `{new_name}`")
    else:
        report.append(f"✅ HTML-файл OK: `{HTML_PATH}`")

    # 2. Перевірка модулів
    for path in MODULE_PATHS:
        if not os.path.exists(path):
            report.append(f"❌ Модуль не знайдено: `{path}`")
        elif contains_emoji_or_special(path):
            new_path = safe_name(path)
            shutil.move(path, new_path)
            report.append(f"⚠️ Emoji/спецсимволи в модулі — перейменовано на `{new_path}`")
        else:
            report.append(f"✅ Модуль OK: `{path}`")

    # 3. Перевірка SVG
    svg_path = os.path.join(ASSETS_DIR, SVG_FILE)
    if not os.path.exists(svg_path):
        report.append(f"❌ SVG-файл не знайдено: `{svg_path}`")
    else:
        report.append(f"✅ SVG-файл OK: `{svg_path}`")

    return "\n".join(report)

if __name__ == "__main__":
    print("# 🧠 DAO-інспектор звіт\n")
    print(inspect_file_structure())
