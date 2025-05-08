CREATE TABLE IF NOT EXISTS characters (
    nickname TEXT NOT NULL,
    rating NUMERIC(2, 1) NOT NULL DEFAULT 1.0,
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL
);

CREATE TYPE game_status AS ENUM ('waiting', 'setup', 'active', 'finished');

CREATE TABLE IF NOT EXISTS games (
    game_id TEXT PRIMARY KEY,
    board_settings JSONB NOT NULL,
    status game_status NOT NULL,
    created_at_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    finished_at_time TIMESTAMPTZ,
    winner_character_id TEXT REFERENCES characters(id) ON DELETE SET NULL
);