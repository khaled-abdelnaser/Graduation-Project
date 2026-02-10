# Docker Commands Helper Script for Graduation Project
# Usage: .\docker-manager.ps1 -Command start|stop|restart|logs|build|down|clean|status

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("start", "stop", "restart", "logs", "build", "down", "clean", "status", "help")]
    [string]$Command = "help"
)

function Show-Menu {
    Write-Host "`n========================================"
    Write-Host "Graduation Project - Docker Manager"
    Write-Host "========================================`n"
    Write-Host "Available Commands:`n"
    Write-Host "  .\docker-manager.ps1 -Command start      # Start all services"
    Write-Host "  .\docker-manager.ps1 -Command stop       # Stop all services"
    Write-Host "  .\docker-manager.ps1 -Command restart    # Restart all services"
    Write-Host "  .\docker-manager.ps1 -Command build      # Build all images"
    Write-Host "  .\docker-manager.ps1 -Command logs       # View logs (real-time)"
    Write-Host "  .\docker-manager.ps1 -Command status     # Show service status"
    Write-Host "  .\docker-manager.ps1 -Command down       # Stop and remove containers"
    Write-Host "  .\docker-manager.ps1 -Command clean      # Clean all and remove volumes"
    Write-Host "  .\docker-manager.ps1 -Command help       # Show this menu`n"
}

function Start-Services {
    Write-Host "Starting all services..." -ForegroundColor Green
    docker-compose up -d --build
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`nServices started successfully!" -ForegroundColor Green
        Write-Host "Frontend: http://localhost" -ForegroundColor Cyan
        Write-Host "Backend API: http://localhost:8080" -ForegroundColor Cyan
        Write-Host "`nWaitng for services to be ready..."
        Start-Sleep -Seconds 5
        Write-Host "You can view logs with: .\docker-manager.ps1 -Command logs`n" -ForegroundColor Yellow
    } else {
        Write-Host "`nError starting services!" -ForegroundColor Red
    }
}

function Stop-Services {
    Write-Host "Stopping all services..." -ForegroundColor Yellow
    docker-compose stop
    Write-Host "Services stopped!" -ForegroundColor Green
}

function Restart-Services {
    Write-Host "Restarting all services..." -ForegroundColor Yellow
    docker-compose restart
    Write-Host "Services restarted!" -ForegroundColor Green
}

function View-Logs {
    Write-Host "Showing logs from all services (Press Ctrl+C to stop)..." -ForegroundColor Cyan
    docker-compose logs -f
}

function Build-Images {
    Write-Host "Building images..." -ForegroundColor Yellow
    docker-compose build --no-cache
    Write-Host "Build completed!" -ForegroundColor Green
}

function Down-Services {
    Write-Host "Stopping and removing containers..." -ForegroundColor Yellow
    docker-compose down
    Write-Host "Containers removed!" -ForegroundColor Green
}

function Clean-All {
    Write-Host "WARNING: This will remove all containers and volumes! Are you sure? (yes/no)" -ForegroundColor Red
    $response = Read-Host
    if ($response.ToLower() -eq "yes") {
        Write-Host "Cleaning up..." -ForegroundColor Yellow
        docker-compose down -v
        Write-Host "Cleanup completed! All data has been removed." -ForegroundColor Green
    } else {
        Write-Host "Cleanup cancelled." -ForegroundColor Cyan
    }
}

function Show-Status {
    Write-Host "Service Status:`n" -ForegroundColor Cyan
    docker-compose ps
}

# Execute command
switch ($Command) {
    "start"   { Start-Services }
    "stop"    { Stop-Services }
    "restart" { Restart-Services }
    "logs"    { View-Logs }
    "build"   { Build-Images }
    "down"    { Down-Services }
    "clean"   { Clean-All }
    "status"  { Show-Status }
    "help"    { Show-Menu }
    default   { Show-Menu }
}
