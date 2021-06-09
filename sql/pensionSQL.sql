CREATE DATABASE `pension`; /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
CREATE TABLE `rooms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) DEFAULT NULL,
  `maxpeople` int(11) DEFAULT NULL,
  `amenity` varchar(200) DEFAULT NULL,
  `service` varchar(200) DEFAULT "",
  `description` varchar(200) DEFAULT "",
  `check_in` varchar(45) DEFAULT NULL,
  `check_out` varchar(45) DEFAULT NULL,
  `main_img` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
INSERT INTO rooms (name,maxpeople,amenity,service,description,check_in,check_out,main_img) VALUES
	 ('아담',3,NULL,'무료 생수,  프리미엄 TV 채널, 무료 Wifi','23평, 퀸사이즈 침대 
정원 전망
대형 스파욕조, 욕실용품, 드라이기','15:00','11:00','images/room/adam01.jpg'),
	 ('소담',2,NULL,'','','15:00','11:00','images/room/sodam01.jpg'),
	 ('오비양',2,NULL,'','','15:00','11:00','images/room/obiyang01.jpg'),
	 ('담빌라',2,NULL,'','','15:00','11:00','images/room/damvilla01.jpg');
	 

/* user table */
CREATE TABLE USER(
	id VARCHAR(30) NOT NULL,
	PASSWORD VARCHAR(30) NOT NULL,
	NAME VARCHAR(20) NOT NULL,
	phone VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
	PRIMARY KEY(id)
);

/* board table */
CREATE TABLE board (
  idx int(11) NOT NULL AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  title varchar(50) NOT NULL,
  content mediumtext NOT NULL,
  regdate datetime NOT NULL,
  modidate datetime NOT NULL,
  passwd varchar(50) NOT NULL,
  hit int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idx`)
);


CREATE TABLE `resevation` (
  `id` int(11) NOT NULL,
  `name` varchar(40) NOT NULL,
  `roomnumber` int(11) NOT NULL,
  `date` varchar(45) NOT NULL,
  `inwon` int(11) NOT NULL,
  `barbecue` varchar(45) NOT NULL,
  `price` int(45) NOT NULL,
  `request` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
  )

