DROP DATABASE IF EXISTS dev_figment;

CREATE DATABASE dev_figment;

USE dev_figment;

CREATE TABLE Authors
    (   
        id INT NOT NULL AUTO_INCREMENT,
        user_id VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        email VARCHAR(255) NOT NULL,
        email_verified BOOLEAN NOT NULL,
        given_name VARCHAR(255),
        PRIMARY KEY (id)
    );

CREATE TABLE Stories 
    (
        id INT NOT NULL AUTO_INCREMENT,
        title VARCHAR (255) NOT NULL,
        description VARCHAR (255) NOT NULL,
        genre VARCHAR (255) NOT NULL,
        PRIMARY KEY (id)
    );