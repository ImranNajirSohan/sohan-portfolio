@echo off
title Django Backend Server
echo Starting Django Backend Server on http://127.0.0.1:8000 ...
cd backend
.\venv\Scripts\python manage.py runserver 127.0.0.1:8000
pause

