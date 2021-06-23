CREATE TABLE IF NOT EXISTS users (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  email varchar(100) NOT NULL UNIQUE,
  firstName varchar(50) NOT NULL,
  lastName varchar(50) NOT NULL,
  password varchar(255) NOT NULL,
  ref varchar(8) NOT NULL UNIQUE
) ENGINE=INNODB;


