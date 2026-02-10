# Graduation Project - Docker Setup

This guide explains how to run the Graduation Project using Docker and Docker Compose.

## Prerequisites

- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Install Docker Compose](https://docs.docker.com/compose/install/)
- Git (for cloning the repository)

## Project Structure

```
Graduation-Project/
├── backend/                 # Spring Boot application
│   ├── Dockerfile          # Backend container configuration
│   ├── .dockerignore        # Files to exclude from Docker build
│   └── pom.xml
├── front-end/              # Angular application
│   ├── Dockerfile          # Frontend container configuration
│   ├── nginx.conf          # Nginx web server configuration
│   ├── .dockerignore       # Files to exclude from Docker build
│   └── package.json
├── docker-compose.yml      # Docker Compose orchestration
└── .env.example            # Environment variables template
```

## Services Overview

### 1. **PostgreSQL Database**

- Image: `postgres:16-alpine`
- Port: `5432`
- Database: `smartdoctor`
- User: `postgres`
- Password: `postgres`
- Volume: `postgres_data` (persistent data storage)

### 2. **Spring Boot Backend**

- Image: Built from `./backend/Dockerfile`
- Port: `8080`
- Dependencies: PostgreSQL (healthy before starting)
- Connects to: PostgreSQL database

### 3. **Angular Frontend**

- Image: Built from `./front-end/Dockerfile`
- Port: `80` (HTTP) and `443` (HTTPS)
- Web Server: Nginx
- Dependencies: Backend (ready before starting)
- API Proxy: Configured to route `/api` requests to backend

## Quick Start

### 1. Clone or Navigate to Project

```bash
cd Graduation-Project
```

### 2. Configure Environment Variables (Optional)

Copy the `.env.example` file to `.env` and modify values if needed:

```bash
cp .env.example .env
```

### 3. Build and Start All Services

```bash
docker-compose up --build
```

This command will:

- Build the backend image from Maven
- Build the frontend image from Node.js
- Start PostgreSQL database
- Start Spring Boot backend
- Start Angular frontend with Nginx
- Create necessary networks and volumes

### 4. Access the Application

- **Frontend**: [http://localhost](http://localhost) or [http://localhost:80](http://localhost:80)
- **Backend API**: [http://localhost:8080](http://localhost:8080)
- **PostgreSQL**: `localhost:5432` (for database tools)

## Common Commands

### Start Services in Background

```bash
docker-compose up -d --build
```

### Stop All Services

```bash
docker-compose down
```

### Stop All Services and Remove Volumes

```bash
docker-compose down -v
```

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

### Rebuild Services

```bash
docker-compose build --no-cache
```

### Execute Commands in Containers

```bash
# Backend container
docker-compose exec backend bash

# Frontend container
docker-compose exec frontend sh

# Database container
docker-compose exec postgres psql -U postgres -d smartdoctor
```

### Check Service Status

```bash
docker-compose ps
```

## Development Mode

### Enable Live Reload for Frontend

The `docker-compose.yml` maps the `./front-end/src` directory to the container, enabling live reload during development.

### Enable Hot Reload for Backend

The `docker-compose.yml` maps the `./backend/src` directory to the container. Restart the backend service to apply changes:

```bash
docker-compose restart backend
```

## Production Deployment

For production use, update the `docker-compose.yml`:

1. Remove volume mappings for source code
2. Change environment variables (especially database credentials)
3. Use proper SSL certificates for HTTPS
4. Add logging and monitoring services

Example environment override:

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## Troubleshooting

### Port Already in Use

If ports are already in use, modify the `docker-compose.yml`:

```yaml
ports:
  - "8080:8080" # Change to "8081:8080" for example
```

### Database Connection Issues

```bash
# Check database logs
docker-compose logs postgres

# Verify database is running
docker-compose ps

# Restart database
docker-compose restart postgres
```

### Frontend Not Connecting to Backend

Check the nginx configuration in `front-end/nginx.conf`. Ensure:

- The `upstream backend` points to the correct service name
- Proxy settings are properly configured
- CORS is handled on backend if needed

### Clear Cache and Rebuild

```bash
docker-compose down -v
docker system prune -a --volumes
docker-compose up --build
```

## Database Management

### Connect to Database

```bash
docker-compose exec postgres psql -U postgres -d smartdoctor
```

### Common PostgreSQL Commands

```sql
-- List tables
\dt

-- Show database info
\l

-- Exit psql
\q
```

### Backup Database

```bash
docker-compose exec postgres pg_dump -U postgres smartdoctor > backup.sql
```

### Restore Database

```bash
docker-compose exec -T postgres psql -U postgres smartdoctor < backup.sql
```

## Network Communication

Services communicate using the `smartdoctor-network` bridge:

- Frontend (Nginx) → Backend: `http://backend:8080`
- Backend → PostgreSQL: `jdbc:postgresql://postgres:5432/smartdoctor`
- Frontend Browser → Backend: `http://localhost:8080` or proxied through `http://localhost/api`

## Health Checks

Each service has a health check configured:

- **PostgreSQL**: Checks if the database is ready
- **Backend**: Checks the Spring Boot actuator health endpoint
- **Frontend**: Checks if Nginx is serving HTTP requests

View health status:

```bash
docker-compose ps
```

## Stopping and Cleanup

```bash
# Stop containers (preserve data and volumes)
docker-compose stop

# Stop and remove containers
docker-compose down

# Stop, remove containers, and delete volumes
docker-compose down -v

# Remove unused images and containers
docker system prune -a
```

## Version Information

- **Java**: 21 (JRE for runtime)
- **Node.js**: 22 (Alpine for smaller image)
- **PostgreSQL**: 16 (Alpine for smaller image)
- **Nginx**: Latest Alpine version
- **Angular**: 19
- **Spring Boot**: 4.0.2

## Support

For issues or questions:

1. Check Docker logs: `docker-compose logs`
2. Verify Docker and Docker Compose versions
3. Ensure all ports are available
4. Review the application configuration files

---

Happy coding! 🚀
