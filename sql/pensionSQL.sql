CREATE DATABASE `pension`; /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
-- pension.rooms definition

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) DEFAULT NULL,
  `maxpeople` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `service` varchar(200) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `check_in` varchar(45) DEFAULT NULL,
  `check_out` varchar(45) DEFAULT NULL,
  `main_img` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
INSERT INTO rooms (name,maxpeople,price,service,description,check_in,check_out,main_img) VALUES
	 ('아담',2,200000,'웰컴티,조식서비스,유무선인터넷','23평, 퀸사이즈 침대 
정원 전망
대형 스파욕조, 욕실용품, 드라이기','15:00','11:00','images/room/아담_0.jpg'),
	 ('소담',6,220000,'웰컴티,조식서비스,유무선인터넷','25평, 퀸사이즈 침대
정원 전망, 제주석 테마 스파
욕실용품, 드라이기','15:00','11:00','images/room/소담_0.jpg'),
	 ('오비양',10,260000,'웰컴티,조식서비스,유무선인터넷','30평, 퀸사이즈 침대
정원 전망
고급 대형 스파, 욕실용품, 드라이기, 식기세트','15:00','11:00','images/room/오비양_0.jpg'),
	 ('담빌라',10,300000,'웰컴티,조식서비스,유무선인터넷','50평, 퀸사이즈 침대
정원 전망
고급 대형 스파, 욕실용품, 드라이기, 식기세트','15:00','11:00','images/room/담빌라_0.jpg');
	 

/* user table */
CREATE TABLE user(
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


-- pension.reservation definition

CREATE TABLE `reservation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(30) NOT NULL,
  `roomId` int(11) NOT NULL,
  `in_date` varchar(45) NOT NULL,
  `out_date` varchar(45) NOT NULL,
  `inwon` int(11) NOT NULL,
  `barbecue` varchar(45) NOT NULL,
  `price` int(45) DEFAULT NULL,
  `request` varchar(100) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

INSERT INTO user(id,password,NAME,phone,email) VALUES('amdin',1234,'조희건',01020219784,'admin@gmail.com');

