CREATE TABLE users (
    username text PRIMARY KEY,
    password text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL
);

CREATE TABLE runs (
    id SERIAL PRIMARY KEY,
    user_id TEXT REFERENCES users,
    day DATE NOT NULL,
    distance TEXT NOT NULL,
    pace TEXT NOT NULL,
    duration TEXT NOT NULL,
    coordinates TEXT[] NOT NULL
);

-- seed sample data --
INSERT INTO users (username, password, first_name, last_name)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User');

INSERT INTO runs (user_id, day, distance, pace, duration, coordinates)
VALUES ('testuser',
        '20210801',
        '1.53', 
        '13.05', 
        '20.01', 
        '{"data", "data", "data"}');