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
    name VARCHAR(200),
    password VARCHAR(200),
    gender VARCHAR(255),
    age INT
);

CREATE TABLE post_list(
    id SERIAL PRIMARY KEY, 
    zipcode INT,
    time TIME,
    price INT,
    distance NUMERIC,
    done BOOLEAN,
    creator_id INT,
    receiver_id INT,
    receiver_name VARCHAR(255),
    creator_name VARCHAR(255)
);
