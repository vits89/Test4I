DROP DATABASE IF EXISTS leaderboard;

CREATE DATABASE leaderboard;

USE leaderboard;

DROP TABLE IF EXISTS users;

CREATE TABLE users
(
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(50) NOT NULL
);

INSERT INTO users (name)
VALUES
	('User 1'),
	('User 2'),
	('User 3'),
	('User 4'),
	('User 5'),
	('User 6');

DROP TABLE IF EXISTS donators;

CREATE TABLE donators
(
	id INT PRIMARY KEY AUTO_INCREMENT,
	donator_id INT,
	donatee_id INT,
	amount FLOAT,
	CONSTRAINT FK_donators_users_1 FOREIGN KEY (donator_id) REFERENCES users (id),
	CONSTRAINT FK_donators_users_2 FOREIGN KEY (donatee_id) REFERENCES users (id)
);
