CREATE TABLE users (
    username text PRIMARY KEY,
    password text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL
);

CREATE TABLE runs (
    id integer PRIMARY KEY,
    user_id text NOT NULL REFERENCES users,
    day TIMESTAMP NOT NULL,
    distance NUMERIC NOT NULL,
    pace NUMERIC NOT NULL,
    duration NUMERIC NOT NULL,
    coordinates TEXT[] NOT NULL,
    place TEXT,
    map_url TEXT
);

-- seed sample data --
INSERT INTO users (username, password, first_name, last_name)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User');

INSERT INTO runs(id, user_id, day, distance, pace, duration, coordinates, place, map_url)
VALUES (1, 
        'testuser', 
        '20210801',
        1.53, 
        13.05, 
        20.01, 
        '{"data", "data", "data"}',
        'Riverside, CA',
        'map here')