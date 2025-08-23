#!/bin/bash

INPUT="src/slides.png"
OUTPUT="src/slides.mp4"

ffmpeg -loop 1 -i "$INPUT" -c:v libx264 -t 10 -pix_fmt yuv420p -vf "scale=1280:720" "$OUTPUT"

echo "🎥 Відео створено: $OUTPUT"
