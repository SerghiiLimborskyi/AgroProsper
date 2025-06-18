#!/bin/bash

echo "🛠️ Створюємо структуру admin-kit..."
mkdir -p admin-kit/backend
mkdir -p admin-kit/scripts
mkdir -p admin-kit/.github/workflows

touch admin-kit/backend/index.js
touch admin-kit/scripts/generate-token.js
touch admin-kit/scripts/scan-secrets.js
touch admin-kit/admin.html
touch admin-kit/.env.example
touch admin-kit/.gitignore
touch admin-kit/README.md
touch admin-kit/install-admin-kit.sh
touch admin-kit/.github/workflows/auth-check.yml

echo "✅ Структура admin-kit створена!"
