CREATE DATABASE walk4health;

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
    creator_name VARCHAR(255)，
    rating NUMERIC
);
