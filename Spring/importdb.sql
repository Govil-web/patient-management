-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: vollmed_api
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `consultas`
--

DROP TABLE IF EXISTS `consultas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consultas` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `medico_id` bigint NOT NULL,
  `paciente_id` bigint NOT NULL,
  `data` datetime NOT NULL,
  `motivo_cancelamiento` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_consultas_medico_id` (`medico_id`),
  KEY `fk_consultas_paciente_id` (`paciente_id`),
  CONSTRAINT `fk_consultas_medico_id` FOREIGN KEY (`medico_id`) REFERENCES `medicos` (`id`),
  CONSTRAINT `fk_consultas_paciente_id` FOREIGN KEY (`paciente_id`) REFERENCES `pacientes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consultas`
--

LOCK TABLES `consultas` WRITE;
/*!40000 ALTER TABLE `consultas` DISABLE KEYS */;
INSERT INTO `consultas` VALUES (1,4,3,'2023-10-10 10:00:00',NULL),(2,4,2,'2023-10-10 11:00:00',NULL),(3,6,4,'2023-10-10 11:00:00',NULL),(4,1,5,'2023-10-10 10:00:00',NULL),(5,1,5,'2024-10-10 10:00:00',NULL);
/*!40000 ALTER TABLE `consultas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flyway_schema_history`
--

DROP TABLE IF EXISTS `flyway_schema_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flyway_schema_history` (
  `installed_rank` int NOT NULL,
  `version` varchar(50) DEFAULT NULL,
  `description` varchar(200) NOT NULL,
  `type` varchar(20) NOT NULL,
  `script` varchar(1000) NOT NULL,
  `checksum` int DEFAULT NULL,
  `installed_by` varchar(100) NOT NULL,
  `installed_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `execution_time` int NOT NULL,
  `success` tinyint(1) NOT NULL,
  PRIMARY KEY (`installed_rank`),
  KEY `flyway_schema_history_s_idx` (`success`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flyway_schema_history`
--

LOCK TABLES `flyway_schema_history` WRITE;
/*!40000 ALTER TABLE `flyway_schema_history` DISABLE KEYS */;
INSERT INTO `flyway_schema_history` VALUES (1,'1','create-table-medicos','SQL','V1__create-table-medicos.sql',-973919634,'root','2023-09-22 17:54:55',20,1),(2,'2','alter-table-medicos-add-telefono','SQL','V2__alter-table-medicos-add-telefono.sql',2096914250,'root','2023-09-22 17:54:55',20,1),(3,'3','create-table-pacientes','SQL','V3__create-table-pacientes.sql',274737925,'root','2023-09-22 17:54:55',19,1),(4,'4','alter-table-medicos-add-activo','SQL','V4__alter-table-medicos-add-activo.sql',-1881248741,'root','2023-09-22 19:59:11',35,1),(5,'5','alter-table-paciente-add-activo','SQL','V5__alter-table-paciente-add-activo.sql',1735962727,'root','2023-09-22 20:44:39',90,1),(6,'6','create-table-usuarios','SQL','V6__create-table-usuarios.sql',1727211803,'root','2023-09-23 00:01:39',27,1),(7,'7','create-table-consultas','SQL','V7__create-table-consultas.sql',20579518,'root','2023-09-24 21:56:24',135,1),(8,'8','alter-table-consultas-add-motivo-cancelacion','SQL','V8__alter-table-consultas-add-motivo-cancelacion.sql',1871424796,'root','2023-09-26 03:34:05',27,1);
/*!40000 ALTER TABLE `flyway_schema_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicos`
--

DROP TABLE IF EXISTS `medicos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicos` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `documento` varchar(6) NOT NULL,
  `especialidad` varchar(100) NOT NULL,
  `calle` varchar(100) NOT NULL,
  `distrito` varchar(100) NOT NULL,
  `complemento` varchar(100) DEFAULT NULL,
  `numero` varchar(20) DEFAULT NULL,
  `ciudad` varchar(100) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `activo` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `documento` (`documento`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicos`
--

LOCK TABLES `medicos` WRITE;
/*!40000 ALTER TABLE `medicos` DISABLE KEYS */;
INSERT INTO `medicos` VALUES (1,'Juanito Montoya','carlos.lopez@voll.med','123459','ORTOPEDIA','calle 1','distrito 1','a','numero 1','Medellin','555555',1),(2,'Ana Mejia','ana.mejia@voll.med','123458','PEDIATRIA','calle 1','distrito 1','a','numero 1','Medellin','555555',0),(3,'Pablo Perez','pablo.perez@voll.med','123444','PEDIATRIA','calle 1','distrito 1','a','numero 1','Medellin','555555',1),(4,'Andrea Redondo','andrea.redondo@voll.med','123445','PEDIATRIA','calle 1','distrito 1','a','numero 1','Medellin','555555',1),(5,'Valerie Redondo','valerie.redondo@voll.med','123446','PEDIATRIA','calle 1','distrito 1','a','numero 1','Medellin','555555',1),(6,'Claudia Villegas','claudia.villegas@voll.med','123447','PEDIATRIA','calle 1','distrito 1','a','numero 1','Medellin','555555',1),(7,'Gonzalo Villegas','gonzalo.villegas@voll.med','123449','PEDIATRIA','calle 1','distrito 1','a','numero 1','Medellin','555555',1),(9,'Sebastian Gomez','sebastin.gomez@voll.med','123498','PEDIATRIA','calle 1','distrito 1','a','numero 1','Medellin','555555',1),(10,'Catalina escobar','catalina.escobar@voll.med','123412','PEDIATRIA','calle 1','distrito 1','a','numero 1','Medellin','555555',1);
/*!40000 ALTER TABLE `medicos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pacientes`
--

DROP TABLE IF EXISTS `pacientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pacientes` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `documento` varchar(14) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `calle` varchar(100) NOT NULL,
  `distrito` varchar(100) NOT NULL,
  `complemento` varchar(100) DEFAULT NULL,
  `numero` varchar(20) DEFAULT NULL,
  `ciudad` varchar(100) NOT NULL,
  `activo` tinyint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `documento` (`documento`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pacientes`
--

LOCK TABLES `pacientes` WRITE;
/*!40000 ALTER TABLE `pacientes` DISABLE KEYS */;
INSERT INTO `pacientes` VALUES (1,'Carlos Mesa','carlos.lopez@voll.med','123.456.789-00','555555','calle 1','distrito 1','a','numero 1','Medellin',0),(2,'Ana Mesa','ana.lopez@voll.med','123.456.789-11','555555','calle 1','distrito 1','a','numero 1','Medellin',1),(3,'Julia Jaramilla','julia-.jaramillo@voll.med','123.456.789-12','555555','calle 1','distrito 1','a','numero 1','Medellin',1),(4,'Sebastian Gomez','sebastian.gomez@voll.med','123.456.789-15','555555','calle 1','distrito 1','a','numero 1','Medellin',1),(5,'Karla Perez','k.perez@voll.med','123.456.789-66','555555','calle 1','distrito 1','a','numero 1','Medellin',1),(6,'Juan sanhez','juan.sanchez@voll.med','123.456.789-90','555555','calle 1','distrito 1','a','numero 1','Medellin',1);
/*!40000 ALTER TABLE `pacientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `login` varchar(100) NOT NULL,
  `clave` varchar(300) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'gonzalo.villegas','$2a$10$/TDZiZ8V2mXSwf5p9cT2JeuziXHGaVqMaQLzTvwKT5T2r4DLIN63S');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-23  8:21:04
