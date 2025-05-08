restart:
	docker compose down --volumes --remove-orphans
	docker compose up --build

restart-soft:
	docker compose down --remove-orphans
	docker compose up --build

seed:
	docker exec -i auth-db psql -U postgres -d authdb < scripts/auth-init.sql

seed-game:
	docker exec -i game-db psql -U postgres -d gamedb < scripts/game-init.sql
