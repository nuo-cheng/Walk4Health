CREATE DATABASE walk4health;

-- CREATE TABLE todo_list(
--     list_id SERIAL PRIMARY KEY, 
--     description VARCHAR(255),
--     user_id INT
-- );

-- CREATE TABLE todo_item(
--     item_id SERIAL PRIMARY KEY,
--     list_id INT NOT NULL REFERENCES todo_list(list_id),
--     description VARCHAR(25),
--     done BOOLEAN
-- );


CREATE TABLE user_list(
    id SERIAL PRIMARY KEY,
    email VARCHAR(200),
    password VARCHAR(200)
);