#!/bin/bash
set -e

echo "=== Installing Python dependencies ==="
python3 -m pip install -r requirements.txt

echo "=== Running Database Migrations ==="
python3 manage.py migrate --noinput || true

echo "=== Seeding Initial Portfolio Data ==="
python3 seed_data.py || true

echo "=== Collecting Static Files ==="
python3 manage.py collectstatic --noinput --clear
