CREATE TABLE IF NOT EXISTS games (
    id TEXT PRIMARY KEY,
    status TEXT NOT NULL,
    started_at TIMESTAMP DEFAULT NOW(),
    ended_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS game_players (
    id SERIAL PRIMARY KEY,
    game_id TEXT REFERENCES games(id),
    character_id TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS game_moves (
    id SERIAL PRIMARY KEY,
    game_id TEXT REFERENCES games(id),
    character_id TEXT NOT NULL,
    x INTEGER,
    y INTEGER,
    turn_number INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);