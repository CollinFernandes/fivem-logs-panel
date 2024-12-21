-- --------------------------------------------------------
-- Host:                         194.107.126.87
-- Server-Version:               11.5.2-MariaDB - mariadb.org binary distribution
-- Server-Betriebssystem:        Win64
-- HeidiSQL Version:             12.7.0.6850
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Exportiere Datenbank-Struktur für masora_logs
CREATE DATABASE IF NOT EXISTS `masora_logs` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;
USE `masora_logs`;

-- Exportiere Struktur von Tabelle masora_logs.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `group` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Exportiere Daten aus Tabelle masora_logs.categories: ~3 rows (ungefähr)
INSERT INTO `categories` (`id`, `name`, `group`) VALUES
	(1, 'revive', 5),
	(10, 'aduty', 6),
	(11, 'godmode', 5),
	(12, 'noclip', 5);

-- Exportiere Struktur von Tabelle masora_logs.groups
CREATE TABLE IF NOT EXISTS `groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `roleId` text NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Exportiere Daten aus Tabelle masora_logs.groups: ~3 rows (ungefähr)
INSERT INTO `groups` (`id`, `name`, `roleId`, `isAdmin`) VALUES
	(1, 'admin', '1302366043448279212', 1),
	(5, 'highteam', '1299786074486210641', 0),
	(6, 'team', '1299786076013072444', 0);

-- Exportiere Struktur von Tabelle masora_logs.logs
CREATE TABLE IF NOT EXISTS `logs` (
  `id` varchar(191) NOT NULL,
  `message` text NOT NULL,
  `category` text NOT NULL,
  `identifiers` text NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Exportiere Daten aus Tabelle masora_logs.logs: ~22 rows (ungefähr)
INSERT INTO `logs` (`id`, `message`, `category`, `identifiers`, `createdAt`) VALUES
	('0ee7d880-c296-4014-a415-3a5a3f90ba87', 'test revived', 'revive', 'asd', '2024-11-03 01:25:44.311'),
	('226730b5-db94-46c9-9aa1-f4742a45a719', 'test revived', 'revive', 'asd', '2024-11-03 01:25:35.445'),
	('28ebd6ba-04bb-4e6c-af7c-b985c7f323ea', 'test revived', 'revive', 'asd', '2024-11-03 01:25:43.519'),
	('3363d6f3-e5b6-4570-a511-c3c40b0af981', 'test revived', 'revive', 'asd', '2024-11-03 01:25:48.603'),
	('41a9711e-5bf8-4617-aca4-13a4b3ff3584', 'test revived', 'revive', 'asd', '2024-11-03 01:25:42.685'),
	('4ac4a25f-094a-4f7d-a413-56911fd9fd4c', 'test revived', 'revive', 'asd', '2024-11-03 01:25:47.684'),
	('528f092c-8cfb-4e66-bcf1-d6457fc8cbe0', 'test revived', 'revive', 'asd', '2024-11-03 01:25:51.081'),
	('6600e955-e618-45bd-ba3f-c8b624ba94e6', 'test revived', 'revive', 'asd', '2024-11-03 01:25:36.451'),
	('72001593-5956-4ef7-a3cf-197821db249f', 'test revived', 'revive', 'asd', '2024-11-03 01:25:50.266'),
	('7e98c3fd-9770-4469-a040-b121f1a1a4f2', 'test revived', 'revive', 'asd', '2024-11-03 01:25:38.324'),
	('849f9c7e-efab-4101-ac7b-660a2c1ea25d', 'test revived', 'revive', 'asd', '2024-11-03 01:25:37.446'),
	('8c829c05-0cff-4660-8a47-7a7faa57371e', 'test revived', 'revive', 'asd', '2024-11-03 01:25:39.287'),
	('91d690e9-314c-4ba2-8a69-303dd65ec52d', 'test revived', 'revive', 'asd', '2024-11-03 01:25:46.828'),
	('a188e11e-5028-4bd7-ae8f-65d1a6fff879', 'test revived', 'revive', 'asd', '2024-11-03 01:25:41.009'),
	('a96f672b-af2a-4115-857b-2f0fba4ec683', 'test revived', 'revive', 'asd', '2024-11-03 01:25:45.246'),
	('aa5c6df1-1119-4536-9cda-51b2e2d8ac93', 'test revived', 'revive', 'asd', '2024-11-03 01:25:40.135'),
	('aadb252c-84df-4b25-8421-0ae909fbdc14', 'test revived', 'revive', 'asd', '2024-11-03 01:25:41.852'),
	('c020af60-f6de-45ef-91ec-411a3b93ce3a', 'revived', 'revive', 'asd', '2024-11-03 00:44:36.680'),
	('e9fe9bf4-5173-46b9-adbf-7afd4bfc574e', 'test revived', 'revive', 'asd', '2024-11-03 01:25:52.040'),
	('f24f240f-0557-47f4-a585-1342fc449cd2', 'test revived', 'revive', 'asd', '2024-11-03 01:25:46.036'),
	('fc1facc2-40a9-45d4-84e3-82168f5b5f8f', 'test revived', 'revive', 'asd', '2024-11-03 01:25:34.318'),
	('fe763242-a4e1-4c42-8c5e-d58d5bf9f4d9', 'test revived', 'revive', 'asd', '2024-11-03 01:25:49.467');

-- Exportiere Struktur von Tabelle masora_logs.users
CREATE TABLE IF NOT EXISTS `users` (
  `email` varchar(255) DEFAULT NULL,
  `username` text DEFAULT NULL,
  `avatar` text DEFAULT NULL,
  `discordId` varchar(255) DEFAULT NULL,
  `group` int(11) DEFAULT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT 0,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `discordId` (`discordId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
