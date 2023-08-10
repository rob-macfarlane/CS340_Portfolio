--Group 21 Data Manipulation SQL
--Sam Parkman and Rob MacFarlane 

------------------------------ActivitiesPage------------------------------
--Retrieves all the activities currently in the DB with their asscoiated ID
Select * from Activities;

--Add a new Acitivty
Insert Into Activities(activityName) Values(:activtyNameInput);

--Updates a current Activity
Update Activities set activityName = :activityNameInput where activityID = :activityIDInputfromDropDown;

--Deletes all activities that match the given Name
Delete from Activities where activityID = :activtyIDInputfromDropDown;

------------------------------ClassesPage------------------------------
--Retrieves all classes and their attributes that is shown on the classes page
Select classID, className, DATE_FORMAT(classDate,'%Y-%m-%d') as classDate, currentCapacity from Classes;

--Add a class to the DB
Insert Into Classes(className, classDate, currentCapcity) 
Values(:classNameInput, :classDateInput, :currentCapcityInput);

--Updates a Classes data
Update Classes Set className = :classNameInput, classDate = :classDateInput, currentCapacity = :currentCapacityInput;
where classID = :classIDInput_selected_from_dropdown;

--Deletes a class
Delete from Classes where classID = :classIDInputfromDropDown;

------------------------------ReservationsPage------------------------------
--Retrieves the reservation with the ID as well as the name of the activity/class to go with it
Select Reservations.reservationID, Customers.customerID, Customers.customerName, Activities.activityID, Activities.activityName, rentalStart, Classes.classID, Classes.className
from Reservations 
Inner Join Customers on Customers.customerID = Reservations.customerID
Left Join Activities on Activities.activityID = Reservations.activityID
Left Join Classes on Classes.classID = Reservations.classID
order by reservationID Asc;

--Add a new reservation to the DB
Insert Into Reservations(customerID, activityID, rentalStart, classID) 
Values(:customerIDInput, activityIDInput, :rentalStartInput, :classIDInput);

--Populates the drop downs for ADD/Update Reservation for CustomerID, ClassID and ActivityID
Select customerID, customerName from Customers Order by customerName;
Select activityID, activityName from Activities Order By activityName;
Select classID, className from Classes Order By className;

--Updates a Reservations Data
Update Reservations Set customerID = :customerIDInput, activityID = :activityIDInput, rentalStart = :rentalStartInput, classID = calssIDInput
where reservationID = :reservationIDInput_selected_from_dropdown;

--Deletes a Reservation
Delete from Reservations where reservationID = :reservationIDFromDropDown;

------------------------------EquipmentsPage------------------------------
--Retrieves all equipments and its attributes to populate the equipments page
Select * FROM Equipments Order by equipmentID ASC;

--Add a new equipment 
Insert Into Equipments(equipmentName, equipmentCondition, rentalLength, itemCount) 
Values(:equipmentNameInput, :equipmentConditionInput, :rentalLengthInput, :itemCountInput);

--Update an Equipment Entry
Update Equipments Set equipmentName = :equipmentNameInput, equipmentCondition = :equipmentConditionInput, rentalLength = :rentalLengthInput, 
    itemCount = :itemCountInput where equipmentID = :equipmentIDInputFromDropDown;

--Delete an Equipment
Delete from Equipments where equipmentID = :equipmentIDInputFromDropDown;

------------------------------CustomersPage------------------------------
--Retieves customer info and shows them on the Customers Page
Select Customers.customerID, customerName, customerEmail, COUNT(Reservations.reservationID) as numberReservations
     From Customers
     inner join Reservations on Customers.customerID = Reservations.customerID
     group by Customers.customerID;

--Add a new customer to the DB
Insert Into Customers(customerName, customerEmail) Values(:customerNameInput, :customerEmailInput);

--Updates a customer entry
Update Customers set customerName = :customerNameInput, customerEmail = :customerEmailInput
    where customerID = :customerIDInputFromDropDown;

--Delete a customer
Delete from Customers where customerID = :customerIDInputFromDropDown;

------------------------------ActivitiesHasEquipmentsPage------------------------------
-- Retrieves all the activities and equipments that go with each activitiesHasEquipmentsID
Select ActivitiesHasEquipments.activitiesHasEquipmentsID, ActivitiesHasEquipments.activityID, Activities.activityName, ActivitiesHasEquipments.equipmentID, Equipments.equipmentName
from ActivitiesHasEquipments
inner Join Activities ON Activities.activityID = ActivitiesHasEquipments.activityID
inner Join Equipments ON Equipments.equipmentID = ActivitiesHasEquipments.equipmentID
Order by activitiesHasEquipmentsID ASC;

--Add a new activity and equipment pairing
Insert Into ActivitiesHasEquipments(activityID, equipmentID) 
Values(:activtyIDInput, :equipmentIDInput);

--Updates pairings of equipmentID's and activityID's
Update ActivitiesHasEquipments SET activityID = :activtyIDInput, equipmentID = :equipmentIDInput;
where activitiesHasEquipmentsID = :activitiesHasEquipmentsIDInput_selected_from_dropdown;

--Deletes All ActivitiesHasEquipmentsID's based on either an input activityID or equipmentID
Delete from ActivitiesHasEquipments Where activitiesHasEquipmentsID = :activitiesHasEquipmentsIDInputFromDropDown