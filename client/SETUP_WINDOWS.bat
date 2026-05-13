@echo off
REM Fundraising Campaign Frontend - Setup Script for Windows

cls
echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║  🎗️ Fundraising Campaign Frontend - Setup Script  🎗️  ║
echo ╚════════════════════════════════════════════════════════╝
echo.

REM Step 1: Navigate to client directory
echo 📂 Step 1: Navigating to client directory...
cd client

REM Step 2: Install dependencies
echo.
echo 📦 Step 2: Installing dependencies...
echo    Running: npm install
call npm install

REM Step 3: Install additional packages
echo.
echo 🔗 Step 3: Installing routing and HTTP client...
echo    Running: npm install axios react-router-dom
call npm install axios react-router-dom

REM Step 4: Create environment file
echo.
echo ⚙️  Step 4: Creating environment configuration...
if not exist .env.local (
    echo    Creating .env.local from template...
    copy .env.example .env.local
    echo    ✅ .env.local created
    echo.
    echo    📝 Update the API URL in .env.local if needed:
    echo       VITE_API_URL=http://localhost:5000/api
) else (
    echo    ✅ .env.local already exists
)

REM Step 5: Show build information
echo.
echo ✅ Setup Complete! You can now run:
echo.
echo    Development server:
echo    $ npm run dev
echo.
echo    Build for production:
echo    $ npm run build
echo.
echo    Lint code:
echo    $ npm run lint
echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║  🚀 Ready to start! Run: npm run dev                  ║
echo ╚════════════════════════════════════════════════════════╝
echo.
pause
