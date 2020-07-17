CREATE DATABASE perntodo;

CREATE TABLE todo_list(
    list_id SERIAL PRIMARY KEY, 
    description VARCHAR(255),
    user_id INT
);

CREATE TABLE todo_item(
    item_id SERIAL PRIMARY KEY,
    list_id INT NOT NULL REFERENCES todo_list(list_id),
    description VARCHAR(255),
    done BOOLEAN
);


CREATE TABLE user_list(
    user_id SERIAL PRIMARY KEY, 
    email VARCHAR(255),
    password VARCHAR(255),
    gender VARCHAR(255),
    age INT
);

CREATE TABLE post_list(
    post_id SERIAL PRIMARY KEY, 
    zipcode INT,
    time VARCHAR(255),
    price INT,
    creator_id INT,
    reciver_id INT
);