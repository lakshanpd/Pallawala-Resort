DROP TABLE IF EXISTS `PhoneNumber`;
DROP TABLE IF EXISTS `Review`;
DROP TABLE IF EXISTS `Request`;
DROP TABLE IF EXISTS `Booking`;
DROP TABLE IF EXISTS `Room`;
DROP TABLE IF EXISTS `Cottage`;
DROP TABLE IF EXISTS `Customer`;

CREATE TABLE `Customer` (
  `CustomerID` INT AUTO_INCREMENT,
  `Email` varchar(255),
  `FirstName` varchar(255),
  `LastName` varchar(255),
  `NIC` varchar(20),
  PRIMARY KEY (`CustomerID`)
);

CREATE TABLE `PhoneNumber` (
  `CustomerID` INT,
  `PhoneNumber` varchar(12),
)

CREATE TABLE `Room` (
  `RoomID` INT,
  `IsCottage` BOOLEAN,
  `MaxMembers` INT,
  `AC` BOOLEAN,
  `Price` DOUBLE,
  `Description` TEXT,
  PRIMARY KEY (`RoomID`)
);

CREATE TABLE `Booking` (
  `BookingRef` INT AUTO_INCREMENT,
  `CustomerID` INT,
  `CheckIn` date,
  `CheckOut` date,
  `Confirmed` BOOLEAN,
  PRIMARY KEY (`BookingRef`),
);

CREATE TABLE `RoomDetails` (
  `BookingRef` INT,
  `RoomID` INT,
  FOREIGN KEY (`BookingRef`) REFERENCES `Booking`(`BookingRef`),
  FOREIGN KEY (`RoomID`) REFERENCES `Room`(`RoomID`)
);

CREATE TABLE `Review` (
  `ReviewID` INT AUTO_INCREMENT,
  'BookingRef' INT,
  `Rating` INT,
  `Content` TEXT,
  PRIMARY KEY (`ReviewId`),
);

CREATE TABLE `Admin` (
  `AdminID` INT AUTO_INCREMENT,
  `Email` varchar(255),
  `Password` varchar(255),
  PRIMARY KEY (`AdminID`)
);

-- test pull req