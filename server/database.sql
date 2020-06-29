CREATE DATABASE perntodo;

CREATE TABLE todo_list(
    list_id SERIAL PRIMARY KEY, 
    description VARCHAR(255)
);

CREATE TABLE todo_item(
    item_id SERIAL PRIMARY KEY,
    list_id INT NOT NULL REFERENCES todo_list(list_id),
    description VARCHAR(255),
    done BOOLEAN
)