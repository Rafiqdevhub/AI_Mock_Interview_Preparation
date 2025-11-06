# ================================
# Makefile for JobPsych Docker Operations
# ================================

.PHONY: help build up down logs restart clean test shell health

# Default target
help:
	@echo "JobPsych Docker Management Commands:"
	@echo "  make build     - Build Docker image"
	@echo "  make up        - Start containers"
	@echo "  make down      - Stop containers"
	@echo "  make logs      - View container logs"
	@echo "  make restart   - Restart containers"
	@echo "  make clean     - Remove containers and images"
	@echo "  make test      - Run health check"
	@echo "  make shell     - Open shell in container"
	@echo "  make health    - Check application health"

# Build Docker image
build:
	@echo "Building Docker image..."
	docker-compose build

# Start containers
up:
	@echo "Starting containers..."
	docker-compose up -d
	@echo "Application started at http://localhost:3000"

# Stop containers
down:
	@echo "Stopping containers..."
	docker-compose down

# View logs
logs:
	docker-compose logs -f app

# Restart containers
restart:
	@echo "Restarting containers..."
	docker-compose restart

# Clean up
clean:
	@echo "Cleaning up containers and images..."
	docker-compose down -v --rmi all

# Run health check
test:
	@echo "Running health check..."
	@curl -f http://localhost:3000/api/health || echo "Health check failed"

# Open shell in container
shell:
	docker-compose exec app /bin/sh

# Check application health
health:
	@curl -s http://localhost:3000/api/health | jq .

# Build without cache
rebuild:
	@echo "Rebuilding without cache..."
	docker-compose build --no-cache

# View container stats
stats:
	docker stats jobpsych-app

# Prune Docker system
prune:
	@echo "Pruning Docker system..."
	docker system prune -af
