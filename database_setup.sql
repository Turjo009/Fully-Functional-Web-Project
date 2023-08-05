CREATE DATABASE your_database;

USE your_database;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email_address VARCHAR(255),
    username VARCHAR(255),
    password VARCHAR(255),
    isAdmin BOOLEAN DEFAULT 0,
    isManager BOOLEAN DEFAULT 0,
    isManager1 BOOLEAN DEFAULT 0,
    isManager2 BOOLEAN DEFAULT 0
);

CREATE TABLE ClubA_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ClubB_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ClubC_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE event_participants (
    user_id VARCHAR(255),
    event_id INT,
    PRIMARY KEY (user_id, event_id)
);

CREATE TABLE event_participants1 (
    user_id VARCHAR(255),
    event_id INT,
    PRIMARY KEY (user_id, event_id)
);

CREATE TABLE event_participants2 (
    user_id VARCHAR(255),
    event_id INT,
    PRIMARY KEY (user_id, event_id)
);