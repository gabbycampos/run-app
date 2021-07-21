CREATE TABLE users (
    username text PRIMARY KEY,
    password text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL
);

CREATE TABLE runs (
    id integer PRIMARY KEY,
    user_id text NOT NULL REFERENCES users,
    distance NUMERIC NOT NULL,
    average_pace NUMERIC NOT NULL,
    duration NUMERIC NOT NULL,
    map text NOT NULL
);

-- seed sample data --
INSERT INTO users (username, password, first_name, last_name)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User');

INSERT INTO runs(id, user_id, distance, average_pace, duration, map)
VALUES (1, 
        'testuser', 
        1.53, 
        13.05, 
        20.01, 
        'Riverside, CA')