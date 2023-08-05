-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: your_database
-- ------------------------------------------------------
-- Server version	8.0.32-0ubuntu0.22.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ClubA_members`
--

DROP TABLE IF EXISTS `ClubA_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ClubA_members` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `join_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ClubA_members`
--

LOCK TABLES `ClubA_members` WRITE;
/*!40000 ALTER TABLE `ClubA_members` DISABLE KEYS */;
INSERT INTO `ClubA_members` VALUES (2,'leon','leonxie598@gmail.com','2023-06-06 03:45:19'),(3,'joe69','lolno070@gmail.com','2023-06-06 04:11:15'),(4,'yuikke','fatboidennis@gmail.com','2023-06-07 13:26:26'),(5,'hello','a1854587@adelaide.edu.au','2023-06-08 06:57:43'),(6,'h','sfsfsefs','2023-06-08 06:59:53'),(7,'john','xqdcey123@gmail.com','2023-06-09 08:27:42'),(8,'jon1','xqdcey123@gmail.com','2023-06-09 09:01:33');
/*!40000 ALTER TABLE `ClubA_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ClubB_members`
--

DROP TABLE IF EXISTS `ClubB_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ClubB_members` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `join_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ClubB_members`
--

LOCK TABLES `ClubB_members` WRITE;
/*!40000 ALTER TABLE `ClubB_members` DISABLE KEYS */;
INSERT INTO `ClubB_members` VALUES (1,'jwy','lolno070@gmail.com','2023-06-04 08:41:07'),(2,'john','xqdcey123@gmail.com','2023-06-09 08:34:23');
/*!40000 ALTER TABLE `ClubB_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ClubC_members`
--

DROP TABLE IF EXISTS `ClubC_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ClubC_members` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `join_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ClubC_members`
--

LOCK TABLES `ClubC_members` WRITE;
/*!40000 ALTER TABLE `ClubC_members` DISABLE KEYS */;
/*!40000 ALTER TABLE `ClubC_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_participants`
--

DROP TABLE IF EXISTS `event_participants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_participants` (
  `user_id` varchar(255) NOT NULL,
  `event_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_participants`
--

LOCK TABLES `event_participants` WRITE;
/*!40000 ALTER TABLE `event_participants` DISABLE KEYS */;
INSERT INTO `event_participants` VALUES ('h',5),('h',6),('hello',7),('joe69',1),('joe69',6),('joe69',7),('john',1),('john',2),('jon1',1),('jon1',2),('yuikke',1);
/*!40000 ALTER TABLE `event_participants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_participants1`
--

DROP TABLE IF EXISTS `event_participants1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_participants1` (
  `user_id` varchar(255) NOT NULL,
  `event_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_participants1`
--

LOCK TABLES `event_participants1` WRITE;
/*!40000 ALTER TABLE `event_participants1` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_participants1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_participants2`
--

DROP TABLE IF EXISTS `event_participants2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_participants2` (
  `user_id` varchar(255) NOT NULL,
  `event_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_participants2`
--

LOCK TABLES `event_participants2` WRITE;
/*!40000 ALTER TABLE `event_participants2` DISABLE KEYS */;
INSERT INTO `event_participants2` VALUES ('yuikke',1);
/*!40000 ALTER TABLE `event_participants2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `email_address` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT '0',
  `isManager` tinyint(1) DEFAULT '0',
  `isManager1` tinyint(1) DEFAULT '0',
  `isManager2` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'Lon','Zee','lolno070@gmail.com','jwy','hello',1,0,0,0),(4,'Leon','Xie','leonxie598@gmail.com','leonxie','hello',1,0,0,0),(5,'fjoe','wdjniw','lolno070@gmail.com','joe69','hello',0,0,0,0),(6,'jimagler','bjorkke','fatboidennis@gmail.com','yuikke','hello',0,0,0,0),(7,'mvlnv','jvpehvjepi','a1854587@adelaide.edu.au','hello','hello',1,0,0,0),(8,'hellefjo','sfsfeef','sfsfsefs','h','h',0,0,0,0),(9,'Turjo','56645','4656','6','6',0,0,0,0),(10,'ggerg','&$&%^$$','45454','!','!',0,0,0,0),(11,'ggwwg','gdgd','gdsgd','sgfdg','sgfgfgdgd',0,0,0,0),(12,'John','Doe','hello@gmail.com','ok','Hwllo',0,0,0,0),(13,'hello','hello','1234','122','h',0,0,0,0),(14,'Jogn','D','xqdcey123@gmail.com','john','hello',1,0,0,0),(15,'ss','s','s','s','s',0,0,0,0),(16,'john','doe','f','user','hello',0,0,0,0),(17,'John','Doe','xqdcey123@gmail.com','jon1','h',1,0,0,0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-09 10:06:22
