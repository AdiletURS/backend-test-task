# Backend Test Task

## Services
1. Auth Service - JWT authentication
    - Port: 3001
    - Swagger: http://localhost:3001/api
    - Endpoints:
        - POST /auth/login
        - POST /auth/refresh
        - POST /auth/seed (for testing)

2. Gateway Service - Protected routes with Todo CRUD
    - Port: 3000
    - Swagger: http://localhost:3000/api
    - Endpoints:
        - CRUD /todos (requires JWT)

## Installation
```bash
# Start all services
./start-dev.sh

# Stop services
./stop.sh

# View logs
./logs.sh