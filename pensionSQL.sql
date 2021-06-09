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
	 ('�ƴ�',3,NULL,'���� ����,  �����̾� TV ä��, ���� Wifi','23��, �������� ħ�� 
���� ����
���� ���Ŀ���, ��ǿ�ǰ, ����̱�','15:00','11:00','images/room/adam01.jpg'),
	 ('�Ҵ�',2,NULL,'','','15:00','11:00','images/room/sodam01.jpg'),
	 ('�����',2,NULL,'','','15:00','11:00','images/room/obiyang01.jpg'),
	 ('�����',2,NULL,'','','15:00','11:00','images/room/damvilla01.jpg');