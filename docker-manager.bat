@echo off
REM Docker Commands Helper Script for Graduation Project
REM This script provides easy commands to manage Docker services

if "%1"=="" goto menu
if "%1"=="start" goto start
if "%1"=="stop" goto stop
if "%1"=="restart" goto restart
if "%1"=="logs" goto logs
if "%1"=="build" goto build
if "%1"=="down" goto down
if "%1"=="clean" goto clean
if "%1"=="status" goto status
if "%1"=="help" goto help

:menu
echo.
echo ========================================
echo Graduation Project - Docker Manager
echo ========================================
echo.
echo Available Commands:
echo   docker-manager.bat start      - Start all services
echo   docker-manager.bat stop       - Stop all services
echo   docker-manager.bat restart    - Restart all services
echo   docker-manager.bat build      - Build all images
echo   docker-manager.bat logs       - View logs from all services
echo   docker-manager.bat status     - Show service status
echo   docker-manager.bat down       - Stop and remove containers
echo   docker-manager.bat clean      - Clean all and remove volumes
echo   docker-manager.bat help       - Show this menu
echo.
goto end

:start
echo Starting all services...
docker-compose up -d --build
echo.
echo Services started successfully!
echo Frontend: http://localhost
echo Backend API: http://localhost:8080
echo.
goto end

:stop
echo Stopping all services...
docker-compose stop
echo Services stopped!
goto end

:restart
echo Restarting all services...
docker-compose restart
echo Services restarted!
goto end

:logs
echo Showing logs from all services...
docker-compose logs -f
goto end

:build
echo Building images...
docker-compose build --no-cache
echo Build completed!
goto end

:down
echo Stopping and removing containers...
docker-compose down
echo Containers removed!
goto end

:clean
echo Cleaning up - removing containers and volumes...
docker-compose down -v
echo Cleanup completed!
goto end

:status
echo Service Status:
docker-compose ps
goto end

:help
goto menu

:end
