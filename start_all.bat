@echo off
title Sohan Dynamic Portfolio - Launcher
echo ========================================================
echo   Starting Sohan Portfolio (Django Backend + React Frontend)
echo ========================================================

echo [1/2] Starting Django Backend on http://127.0.0.1:8000 ...
start "Django Backend Server (Port 8000)" cmd /k "cd backend && .\venv\Scripts\python manage.py runserver 127.0.0.1:8000"

timeout /t 3 /nobreak > nul

echo [2/2] Starting React Frontend on http://localhost:5173 ...
start "React Frontend (Port 5173)" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================================
echo   Application Launched Successfully!
echo   - React Frontend:  http://localhost:5173
echo   - Django Backend:  http://127.0.0.1:8000
echo   - Django Admin:    http://127.0.0.1:8000/admin/
echo   - Username: admin   ^| Password: admin123
echo ========================================================
pause

