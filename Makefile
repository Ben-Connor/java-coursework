dev:
	docker network create app-network
	docker compose -f ./docker/docker-compose.dev.yml build
	docker compose -f ./docker/docker-compose.dev.yml up --remove-orphans
prod:
	docker network create app-network
	docker compose -f ./docker/docker-compose.prod.yml build
	docker compose -f ./docker/docker-compose.prod.yml up --remove-orphans
dev-down:
	docker compose -f ./docker/docker-compose.dev.yml down --remove-orphans --volumes
	docker network remove app-network
prod-down:
	docker compose -f ./docker/docker-compose.prod.yml down --remove-orphans
	docker network remove app-network
test:
	make -C ./backend test
