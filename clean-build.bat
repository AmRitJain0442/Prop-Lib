@echo off
echo Cleaning Next.js build artifacts...

:: Kill any running Node processes
taskkill /F /IM node.exe 2>nul

:: Wait a moment
timeout /t 2 /nobreak >nul

:: Remove .next directory
if exist .next (
    echo Removing .next directory...
    rmdir /s /q .next
)

:: Remove build cache
if exist .turbo (
    echo Removing .turbo directory...
    rmdir /s /q .turbo
)

echo Cleanup complete!
echo.
echo You can now run: npm run build
pause
