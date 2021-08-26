-- MySQL dump 10.13  Distrib 8.0.25, for Linux (x86_64)
--
-- Host: localhost    Database: rcon
-- ------------------------------------------------------
-- Server version	8.0.25-0ubuntu0.20.04.1

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
-- Table structure for table `DcUser`
--

DROP TABLE IF EXISTS `DcUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DcUser` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `usr2gmID` int NOT NULL,
  `usrKey` varchar(45) NOT NULL,
  `dcID` bigint NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `getKey_idx` (`usrKey`),
  KEY `fk_DcUser_1_idx` (`usr2gmID`),
  CONSTRAINT `fk_DcUser_1` FOREIGN KEY (`usr2gmID`) REFERENCES `User2Games` (`ID`),
  CONSTRAINT `fk_DcUser_2` FOREIGN KEY (`usrKey`) REFERENCES `Users` (`usrGetKey`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DcUser`
--

LOCK TABLES `DcUser` WRITE;
/*!40000 ALTER TABLE `DcUser` DISABLE KEYS */;
INSERT INTO `DcUser` VALUES (29,12,'dGvXFZaeahxd2Gy9miLr',383251434906583041),(30,3,'bNMNSeVKtTkBwON8uCa0',247796480264503298),(31,11,'542psnzvFwYQTNBHyXEP',332581457501618176),(32,57,'dGvXFZaeahxd2Gy9miLr',383251434906583041),(33,58,'bNMNSeVKtTkBwON8uCa0',247796480264503298),(34,59,'bNMNSeVKtTkBwON8uCa0',247796480264503298);
/*!40000 ALTER TABLE `DcUser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Games`
--

DROP TABLE IF EXISTS `Games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Games` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `gmName` varchar(45) DEFAULT NULL,
  `gmVersion` varchar(45) DEFAULT NULL,
  `gmType` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Games`
--

LOCK TABLES `Games` WRITE;
/*!40000 ALTER TABLE `Games` DISABLE KEYS */;
INSERT INTO `Games` VALUES (1,'Minecraft','1.16.5','Vanilla'),(2,'Minecraft','1.16.5','Spigot'),(3,'Minecraft','1.16.5','Bukkit'),(4,'ARK',NULL,NULL),(5,'Terraria',NULL,NULL),(6,'Minecraft','1.7.10','Forge');
/*!40000 ALTER TABLE `Games` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User2Games`
--

DROP TABLE IF EXISTS `User2Games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User2Games` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `gmID` int DEFAULT NULL,
  `usrID` int DEFAULT NULL,
  `rcnPort` int DEFAULT NULL,
  `gmPort` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `rcnPort_UNIQUE` (`rcnPort`),
  UNIQUE KEY `gmPort_UNIQUE` (`gmPort`),
  KEY `fk_User2Games_1_idx` (`gmID`),
  KEY `fk_User2Games_2_idx` (`usrID`),
  CONSTRAINT `fk_User2Games_1` FOREIGN KEY (`gmID`) REFERENCES `Games` (`ID`),
  CONSTRAINT `fk_User2Games_2` FOREIGN KEY (`usrID`) REFERENCES `Users` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User2Games`
--

LOCK TABLES `User2Games` WRITE;
/*!40000 ALTER TABLE `User2Games` DISABLE KEYS */;
INSERT INTO `User2Games` VALUES (3,2,20,11,NULL),(10,6,29,NULL,11),(11,1,30,25585,25555),(12,2,32,12346,12345),(22,1,40,NULL,NULL),(56,2,41,1234,1234),(57,6,32,111,111),(58,4,20,333,333),(59,6,20,12349,12349);
/*!40000 ALTER TABLE `User2Games` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `usrName` varchar(45) NOT NULL,
  `usrPasswd` varchar(100) NOT NULL,
  `usrSession` varchar(20) NOT NULL,
  `usrGetKey` varchar(20) NOT NULL,
  `usrPostKey` varchar(20) NOT NULL,
  `usrRight` tinyint(1) NOT NULL,
  `usrColor` varchar(20) DEFAULT NULL,
  `usrBackground` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `usrSession_UNIQUE` (`usrSession`),
  UNIQUE KEY `usrGetKey_UNIQUE` (`usrGetKey`),
  UNIQUE KEY `usrPostKey_UNIQUE` (`usrPostKey`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (20,'sven','$2y$10$BWzGiM7igs/ZitBsWFSMx.7UT4OJcB0vQYFpySEB2lsQxhupFRe5m','19E7NnKBSUrhySyjqV5I','bNMNSeVKtTkBwON8uCa0','z21w5nBAtuLN440Y0EEt',1,'#00ff00','white'),(29,'rick','$2y$10$iC2I40T/MK4CXNZ/LevFKeVPzAybiFgqh8ghQYDD46KRq74UdhItC','xiuJ880m6ZGAVLPf4Jyf','UjxoKNthmhBQPHNB7NB1','O7bYa9S4WrzlRViMKXqH',0,NULL,NULL),(30,'zoe','$2y$10$kdv5FQ1KyzYUHbp8KnI5ne2OqvPVziDV./m8Ovo1oGEAjayDsszfy','T40EWkU5WtxSkNK3Pfm9','542psnzvFwYQTNBHyXEP','pxpwu7bzyRRXFOyvRJTD',0,'#ff00ff','rosa'),(32,'benno','$2y$10$xCd/RgT4.yNwiSp0KE9tU.4TAMEe.EDxSb7d0eSuUJi3Dv3/5G4bS','YhdSIUnda4ejzCy9doZq','dGvXFZaeahxd2Gy9miLr','uuviACNLz0x4MT3c9b1U',1,'#ff00ff','red'),(40,'simon','$2y$10$0k/tEHt9pz51scyUovi1oe4jtRLB5ofo916t6Rkq9YLmSBYaItfS2','Wbbrz66JLgUC03OD8RpC','skcIrRqHP7crN8TAUvSG','lMKsSyN25GwpKnMSJZyf',0,NULL,NULL),(41,'test','$2y$10$8nY.hCBWWpMuo0/2Ndosxe0Fcaffd0sfsnScCk.s6l7AbkZ5/gBxa','xsqjiJOkFLDIiq4gYwHP','SUwVdw9K6Hp44sdq3WRj','LyxhXepMcAjWTBwfoahF',0,'white','white');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mcSettings`
--

DROP TABLE IF EXISTS `mcSettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mcSettings` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `u2gID` int NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID_UNIQUE` (`ID`),
  UNIQUE KEY `u2gID_UNIQUE` (`u2gID`),
  CONSTRAINT `fk_mcSettings_1` FOREIGN KEY (`u2gID`) REFERENCES `User2Games` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mcSettings`
--

LOCK TABLES `mcSettings` WRITE;
/*!40000 ALTER TABLE `mcSettings` DISABLE KEYS */;
/*!40000 ALTER TABLE `mcSettings` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-01 10:44:33
