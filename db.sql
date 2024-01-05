-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 05, 2024 at 07:47 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_ads_be`
--

-- --------------------------------------------------------

--
-- Table structure for table `Employees`
--

CREATE TABLE `Employees` (
  `id` int(11) NOT NULL,
  `nomorInduk` varchar(255) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `alamat` varchar(255) DEFAULT NULL,
  `tanggalLahir` date DEFAULT NULL,
  `tanggalBergabung` date DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Employees`
--

INSERT INTO `Employees` (`id`, `nomorInduk`, `nama`, `alamat`, `tanggalLahir`, `tanggalBergabung`, `createdAt`, `updatedAt`) VALUES
(1, 'IP06001', 'Agus', 'Jln Gaja Mada no 12, Surabaya', '1980-10-31', '2005-07-07', '2024-01-04 08:39:19', '2024-01-04 08:39:19'),
(2, 'IP06002', 'Amin', 'Jln Imam Bonjol no 11, Mojokerto', '1977-03-09', '2005-07-08', '2024-01-04 08:54:08', '2024-01-04 08:54:08'),
(3, 'IP06003', 'Yusuf', 'Jln A Yani Raya 15 No 14, Malang', '1973-08-09', '2006-08-07', '2024-01-04 08:56:37', '2024-01-04 09:32:17'),
(4, 'IP06004', 'Alyssa', 'Jln Bungur Sari V no 166, Bandung', '1983-03-18', '2006-09-06', '2024-01-04 09:21:21', '2024-01-04 09:21:21'),
(5, 'IP06005', 'Maulana', 'Jln Candi Agung, No 78 Gg 5, Jakarta', '1978-11-10', '2006-09-10', '2024-01-04 09:26:29', '2024-01-04 09:26:29'),
(6, 'IP06006', 'Agfika', 'Jln Nangka, Jakarta Timur', '1979-02-07', '2007-01-02', '2024-01-04 10:39:18', '2024-01-04 10:39:18'),
(7, 'IP06007', 'James', 'Jln Merpati, 8 Surabaya', '1989-05-18', '2007-04-04', '2024-01-04 10:39:50', '2024-01-04 10:39:50'),
(8, 'IP06008', 'Octavanus', 'Jln A Yani 17, B 08 Sidoarjo', '1985-04-14', '2007-05-19', '2024-01-04 10:40:23', '2024-01-04 10:40:23'),
(9, 'IP06009', 'Nugroho', 'Jln Duren tiga 167, Jakarta Selatan', '1984-01-01', '2008-01-16', '2024-01-04 10:40:59', '2024-01-04 10:40:59'),
(10, 'IP06010', 'Raisa', 'Jln Kelapa Sawit, Jakarta Selatan', '1990-12-17', '2008-08-16', '2024-01-04 10:41:30', '2024-01-04 10:41:30'),
(13, 'IP06011', 'Raisa', 'Jln Kelapa Sawit, Jakarta Selatan', '1990-12-17', '2008-08-16', '2024-01-04 13:20:32', '2024-01-04 13:20:32'),
(14, 'IP06012', 'Aku', 'Jln A Yani Raya 15 No 14, Malang', '1973-08-09', '2024-08-07', '2024-01-04 13:28:32', '2024-01-04 13:39:52'),
(16, 'IP06100', 'Prinafsika', 'Jln Margonda, Jakarta Barat', '1992-12-17', '2023-08-16', '2024-01-05 06:18:21', '2024-01-05 06:18:59');

-- --------------------------------------------------------

--
-- Table structure for table `Leaves`
--

CREATE TABLE `Leaves` (
  `id` int(11) NOT NULL,
  `nomorInduk` varchar(255) NOT NULL,
  `tanggalCuti` date NOT NULL,
  `lamaCuti` int(11) DEFAULT NULL,
  `keterangan` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Leaves`
--

INSERT INTO `Leaves` (`id`, `nomorInduk`, `tanggalCuti`, `lamaCuti`, `keterangan`, `createdAt`, `updatedAt`) VALUES
(1, 'IP06001', '2020-08-02', 2, 'Acara Keluarga', '2024-01-04 14:06:48', '2024-01-04 14:06:48'),
(2, 'IP06001', '2020-08-18', 2, 'Anak Sakit', '2024-01-04 14:08:15', '2024-01-04 14:08:15'),
(3, 'IP06006', '2020-08-19', 1, 'Nenek Sakit', '2024-01-04 14:10:46', '2024-01-04 14:10:46'),
(4, 'IP06100', '2020-08-19', 1, 'Nenek Sakit', '2024-01-05 06:33:53', '2024-01-05 06:33:53'),
(5, 'IP06100', '2021-08-19', 2, 'Nenek Sakit', '2024-01-05 06:34:03', '2024-01-05 06:34:03');

-- --------------------------------------------------------

--
-- Table structure for table `SequelizeMeta`
--

CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `SequelizeMeta`
--

INSERT INTO `SequelizeMeta` (`name`) VALUES
('20240104081653-create-employee.js'),
('20240104082230-create-leave.js'),
('20240104084304-remove-no-from-employee.js'),
('20240104084613-change-date-columns.js'),
('20240104135941-change-date-columns-cuti.js');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Employees`
--
ALTER TABLE `Employees`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Leaves`
--
ALTER TABLE `Leaves`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_leaves_employee` (`nomorInduk`);

--
-- Indexes for table `SequelizeMeta`
--
ALTER TABLE `SequelizeMeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Employees`
--
ALTER TABLE `Employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `Leaves`
--
ALTER TABLE `Leaves`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Leaves`
--
ALTER TABLE `Leaves`
  ADD CONSTRAINT `fk_leaves_employee` FOREIGN KEY (`nomorInduk`) REFERENCES `Employees` (`nomorInduk`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
