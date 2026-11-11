@echo off
REM ZUHAYN website - one-click local dev server
REM First run installs dependencies, then starts Next.js dev server.
cd /d %~dp0
if not exist node_modules (
  echo Installing dependencies, prothom bar ektu somoy lagbe...
  call npm install
)
echo.
echo Website cholche: http://localhost:3000
echo Bondho korte ei window te Ctrl+C chap dao.
echo.
call npm run dev
pause
