/*  
Samuel Parkman
Robert MacFarlane
Group 21
*/


SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- create tables for the entities below here
CREATE OR REPLACE TABLE Classes (  
    classID int NOT NULL AUTO_INCREMENT unique,
    className varchar(125) Not Null,
    classDate date Not Null,
    currentCapacity int Not Null,
    Primary Key (classID)
); 

CREATE OR REPLACE TABLE Equipments (  
    equipmentID int NOT NULL AUTO_INCREMENT unique,
    equipmentName varchar(125) Not Null,
    equipmentCondition varchar(125) Not Null,
    rentalLength int Not Null,
    itemCount int Not Null,
    Primary Key (equipmentID)
); 

CREATE OR REPLACE TABLE Activities (  
    activityID int Not Null AUTO_INCREMENT unique,
    activityName varchar(125) Not Null,
    Primary Key (activityID)
); 

CREATE OR REPLACE TABLE Customers (  
    customerID int NOT NULL AUTO_INCREMENT unique,
    customerName varchar(125) Not Null,
    customerEmail varchar(125) not Null,
    numberReservations int Not Null,
    Primary Key (CustomerID)
); 

-- Creates Reservations table, oneRequired checks that either activityID or classID are not null
CREATE OR REPLACE TABLE Reservations (  
    reservationID int Not Null AUTO_INCREMENT unique,
    customerID int Not Null,
    activityID int,
    rentalStart date,
    classID int,
    oneRequired int not NULL default 1 CHECK (activityID IS NOT NULL OR classID IS NOT NULL), 
    Primary Key (reservationID),
    Foreign Key (customerID) References Customers(customerID)
    ON DELETE CASCADE,
    Foreign Key (activityID) References Activities(activityID)
    ON DELETE CASCADE,
    Foreign Key (classID) References Classes(classID)
    ON DELETE CASCADE
); 



CREATE OR REPLACE TABLE ActivitiesHasEquipments (
    activitiesHasEquipmentsID int NOT NULL AUTO_INCREMENT unique,
    equipmentID int,
    activityID int,
    Primary Key (activitiesHasEquipmentsID),
    CONSTRAINT FK_ActivitiesHasEquipments_equipmentID Foreign Key (equipmentID)
    REFERENCES Equipments(equipmentID) ON DELETE CASCADE,
    CONSTRAINT FK_ActivitiesHasEquipments_activityID Foreign Key (activityID)
    REFERENCES Activities(activityID) ON DELETE CASCADE
);

-- Insert values into the tables
INSERT INTO Classes (className, classDate, currentCapacity)
Values ('Ski Basics', '2023-07-20', 18),
('Ski Intermediate', '2023-04-28', 5),
('Climbing Safety', '2024-05-04', 27),
('Yoga', '2017-03-04', 16),
('Basketball Shooting', '2018-04-05', 4);

INSERT INTO Equipments (equipmentName, equipmentCondition, rentalLength, itemCount)
Values ('Hiking Backpack', 'Good', 4, 6),
('Skis', 'New', 4, 12),
('Ski Poles', 'New', 4, 12),
('Soccer Ball', 'Wear and Tear', 14, 4),
('Soccer Cleats', 'Terrible', 14, 20);

INSERT INTO Reservations (customerID, activityID, rentalStart, classID)
Values (1, NULL, NUll, 2),
(2, 2, '2023-08-15', NULL),
(3, 5, '2023-07-23', NULL),
(4, 5, '2023-07-15', 1),
(4, 1, '2023-07-15', 1);

INSERT INTO Activities (activityName)
Values ('Backpacking'),
('Skiing'),
('Tennis'),
('Soccer'),
('Basketball');


INSERT INTO Customers (customerName, customerEmail, numberReservations)
Values ('Dave', 'D@frontier.com', 1),
('Fred', 'Fred@gmail.com', 1),
('Kayla', 'Kay@hotmail.com', 1),
('Amanda', 'A.T@yahoo.com', 2),
('Kyle', 'Soccer@gmail.com', 0);

INSERT INTO ActivitiesHasEquipments (activityID, equipmentID)
Values (1, 2),
(2, 2),
(2, 1),
(4, 4),
(4, 5);


SET FOREIGN_KEY_CHECKS=1;
COMMIT;