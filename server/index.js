/*
    Setup
*/
const express = require('express');
const db = require('./db-connector.js')
const cors = require('cors')
var bodyParser = require('body-parser')
const app = express();
const PORT = 4567;
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

/*
    ROUTES
*/

// ***************************ACTIVITIESHASEQUIPMETNS PAGE API******************************* 

//Gets dat from ActivitesHasEquipments DB
app.get("/ActivitiesHasEquipmentsPage", (req, res) => {
    const selectQuery = `Select ActivitiesHasEquipments.activitiesHasEquipmentsID, ActivitiesHasEquipments.activityID, Activities.activityName, 
ActivitiesHasEquipments.equipmentID, Equipments.equipmentName 
from ActivitiesHasEquipments 
inner Join Activities ON Activities.activityID = ActivitiesHasEquipments.activityID 
inner Join Equipments ON Equipments.equipmentID = ActivitiesHasEquipments.equipmentID 
Order by activitiesHasEquipmentsID ASC;`
    db.pool.query(selectQuery, (err, result) => {
        if (err) {
            res.status(404).json({ Error: 'Issue Occured' });
            console.log(err);
        } else {
            // res.status(201).json({ message: 'Values updated in table'})
            res.send(result)
        }
    });
});

// Adds data to the ActivitesHasEquipments DB 
app.post("/ActivitiesHasEquipmentsPage", (req, res) => {
    db.pool.query(`Insert Into ActivitiesHasEquipments(activityID, equipmentID) Values(${req.body.activityID}, ${req.body.equipmentID});`, (err, result) => {
        if (err) {
            res.status(404).json({ Error: 'Not found' });
            console.log(err)
        } else {
            res.status(204).json({ message: 'Intersection entry has been added to table' });
        }
    });
});

// Updates data in the ActivitesHasEquipments DB
app.put("/ActivitiesHasEquipmentsPage", (req, res) => {
    db.pool.query(`Update ActivitiesHasEquipments set activityID =${req.body.activityID}, equipmentID = ${req.body.equipmentID} 
 where activitiesHasEquipmentsID = ${req.body.activitiesHasEquipmentsID};`, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.status(200).json({ message: 'Updating table with new values' })
    });
});

// Deletes data from the ActivitesHasEquipments DB
app.delete("/ActivitiesHasEquipmentsPage", (req, res) => {
    db.pool.query(`Delete from ActivitiesHasEquipments Where activitiesHasEquipmentsID = ${req.body.activitiesHasEquipmentsID};`, (err, result) => {
        if (err) {
            res.status(404).json({ Error: 'Not found' });
            console.log(err)
        }
        res.status(204).send();
    });
});

// ***************************ACTIVITIES PAGE API*******************************

//Gets data from Activites DB
app.get("/ActivitiesPage", (req, res) => {
    const selectQuery = "Select * from Activities;"
    db.pool.query(selectQuery, (err, result) => {
        if (err) {
            res.status(404).json({ Error: 'Issue Occured' });
            console.log(err);
        } else {
            res.send(result)
        }
    });
});

// Adds data to the Activites DB 
app.post("/ActivitiesPage", (req, res) => {
    db.pool.query(`Insert Into Activities(activityName) Values('${req.body.activityName}');`, (err, result) => {
        if (err) {
            res.status(404).json({ Error: 'Not found' });
            console.log(err)
        } else {
            res.status(204).json({ message: 'Intersection entry has been added to table' });
        }
    });
});

// Updates data in the Activites DB
app.put("/ActivitiesPage", (req, res) => {
    db.pool.query(`Update Activities set activityName = '${req.body.activityName}' where activityID = ${req.body.activityID};`, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.status(200).json({ message: 'Updating table with new values' })
    });
});

// Deletes data from the Activites DB
app.delete("/ActivitiesPage", (req, res) => {
    db.pool.query(`Delete from Activities where activityID = ${req.body.activityID};`, (err, result) => {
        if (err) {
            res.status(404).json({ Error: 'Not found' });
            console.log(err)
        }
        res.status(204).send();
    });
});

// ***************************CLASSES PAGE API*******************************

//Gets data from Classes DB
app.get("/ClassesPage", (req, res) => {
    const selectQuery = "Select classID, className, DATE_FORMAT(classDate,'%Y-%m-%d') as classDate, currentCapacity from Classes;"
    db.pool.query(selectQuery, (err, result) => {
        if (err) {
            res.status(404).json({ Error: 'Issue Occured' });
            console.log(err);
        } else {
            res.send(result)
        }
    });
});

// Adds data to the Classes DB
app.post("/ClassesPage", (req, res) => {
    console.log(req.body)
    console.log(typeof(req.body.className))
            console.log(typeof(req.body.classDate))
            console.log(typeof(req.body.currentCapacity))
    db.pool.query(`Insert Into Classes(className, classDate, currentCapacity) Values('${req.body.className}', '${req.body.classDate}', 
    ${req.body.currentCapacity});`, (err, result) => {
        if (err) {
            res.status(404).json({ Error: 'Not found' });
            console.log(err)
        } else {
            res.status(204).json({ message: 'Intersection entry has been added to table' });
        }
    });
});

// Updates data from Classes DB
app.put("/ClassesPage", (req, res) => {
    db.pool.query(`Update Classes Set className = '${req.body.className}', classDate = '${req.body.classDate}', currentCapacity = ${req.body.currentCapacity}
    where classID = ${req.body.classID};`, (err, result) => {
        if (err) {
            res.status(404).json({ Error: 'Not found' });
            console.log(err)
        } else {
            res.status(204).json({ message: 'Intersection entry has been added to table' });
        }
    });
});

// Deletes data from the Classes DB
app.delete("/ClassesPage", (req, res) => {
    db.pool.query(`Delete from Classes where classID = ${req.body.classID};`, (err, result) => {
        if (err) {
            res.status(404).json({ Error: 'Not found' });
            console.log(err)
        }
        res.status(204).send();
    });
});

// ***************************** Customers Page API ****************************

// Retrieves data from the CustomersDB 
app.get("/CustomersPage", (req, res) => {
    const selectQuery = `Select Customers.customerID, customerName, customerEmail, COUNT(Reservations.reservationID) as numberReservations
     From Customers
     inner join Reservations on Customers.customerID = Reservations.customerID
     group by Customers.customerID;`
    db.pool.query(selectQuery, (err, result) => {
        if (err) {
            res.status(404).json({ Error: 'Issue Occured' });
            console.log(err);
        } else {
            res.send(result)
        }
    });
});

// Adds data to the CustomersDB
app.post("/CustomersPage", (req, res) => {
    db.pool.query(`Insert Into Customers (customerName, customerEmail) 
    Values ('${req.body.customerName}', '${req.body.customerEmail}');`, (err, result) => {
        if (err) {
            res.status(404).json({ Error: 'Not found' });
            console.log(err)
        } else {
            res.status(204).json({ message: 'Customer entry has been added to table' });
        }
    });
});

//     // Updates data in the CustomersDB
app.put("/CustomersPage", (req, res) => {
    db.pool.query(`Update Customers set customerName = '${req.body.customerName}', customerEmail = '${req.body.customerEmail}'
    where customerID = ${req.body.customerID};`, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.status(200).json({ message: 'Updating table with new values' })
    });
});

//     // Deletes data from the CustomersDB
app.delete("/CustomersPage", (req, res) => {
    db.pool.query(`Delete from Customers where customerID = ${req.body.customerID};`, (err, result) => {
        if (err) {
            res.status(404).json({ Error: 'Not found' });
            console.log(err)
        }
        res.status(204).send();
    });
});


// ***************************RESERVATIONS PAGE API*******************************

//Gets data from Reservation DB
app.get("/ReservationsPage", (req, res) => {
    const selectQuery = `Select Reservations.reservationID, Customers.customerID, Customers.customerName, Activities.activityID, 
    Activities.activityName, DATE_FORMAT(rentalStart,'%Y-%m-%d') as rentalStart, Classes.classID, Classes.className
    from Reservations 
    Inner Join Customers on Customers.customerID = Reservations.customerID
    Left Join Activities on Activities.activityID = Reservations.activityID
    Left Join Classes on Classes.classID = Reservations.classID
    order by reservationID Asc;`
    db.pool.query(selectQuery, (err, result) => {
            if (err) {
                res.status(404).json({ Error: 'Issue Occured' });
                console.log(err);
            } else {
                console.log(result)
                res.send(JSON.stringify(result))
            }
        });
    });

// Adds data to the Reservation DB 
app.post("/ReservationsPage", (req, res) => {
    const nullVal = null
    if (req.body.activityID == "") {
        req.body.activityID = nullVal
    }
    if (req.body.classID == "") {
        req.body.classID = nullVal
    }
    console.log(req.body)

    db.pool.query(`Insert Into Reservations(customerID, activityID, rentalStart, classID) 
    Values(${req.body.customerID}, ${req.body.activityID}, '${req.body.rentalStart}', ${req.body.classID});`, (err, result) => {
        if (err) {
            res.status(404).json({ Error: 'Not found' });
            console.log(err)
        } else {
            res.status(204).json({ message: 'Intersection entry has been added to table' });
        }
    });
});

// Updates data in the Reservation DB
app.put("/ReservationsPage", (req, res) => {
    const nullVal = null
    if (req.body.activityID == "") {
        req.body.activityID = nullVal
    }
    if (req.body.classID == "") {
        req.body.classID = nullVal
    }
    db.pool.query(`Update Reservations Set customerID = ${req.body.customerID}, activityID = ${req.body.activityID}, rentalStart = '${req.body.rentalStart}', 
    classID = ${req.body.classID} where reservationID = ${req.body.reservationID};`, (err, result) => {
        if (err) {
            res.status(404).json({ Error: 'Not found' });
            console.log(err)
        } else {
            res.status(204).json({ message: 'Intersection entry has been added to table' });
        }
    });
});

// Deletes data from the Reservation DB
app.delete("/ReservationsPage", (req, res) => {
    db.pool.query(`Delete from Reservations where reservationID = ${req.body.reservationID};`, (err, result) => {
        if (err) {
            res.status(404).json({ Error: 'Not found' });
            console.log(err)
        }
        res.status(204).send();
    });
});

// Retrieves CustomerID from Customers Table
app.get("/ReservationsPage/CustomersID", (req, res) => {
    db.pool.query(`Select customerID, customerName from Customers Order by customerName;`, (err, result) => { 
        if (err) {
            res.status(404).json({ Error: 'Issue Occured' });
            console.log(err);
        } else {
            res.send(result)
            
        }
    });
});

// Retrieves ActivityID from Activities Table
app.get("/ReservationsPage/ActivityID", (req, res) => {
    db.pool.query(`Select activityID, activityName from Activities Order By activityName;`, (err, result) => { 
        if (err) {
            res.status(404).json({ Error: 'Issue Occured' });
            console.log(err);
        } else {
            res.send(result)
            
        }
    });
});

// Retrieves ClassID from Classes Table
app.get("/ReservationsPage/ClassID", (req, res) => {
    db.pool.query(`Select classID, className from Classes Order By className;`, (err, result) => { 
        if (err) {
            res.status(404).json({ Error: 'Issue Occured' });
            console.log(err);
        } else {
            res.send(result)
            
        }
    });
});

// ***************************EQUIPMENT PAGE API*******************************

// Retrieves data from the database Equipments Page 
app.get("/EquipmentsPage", (req, res) => {
    const selectQuery = "Select * FROM Equipments Order by equipmentID ASC;"
    db.pool.query(selectQuery, (err, result) => {
        if (err) {
            res.status(404).json({ Error: 'Issue Occured' });
            console.log(err);
        } else {
            // res.status(201).json({ message: 'Values updated in table'})
            res.send(result)
        }
    });
});

// Adds data in Equipments Page DB
app.post("/EquipmentsPage", (req, res) => {
    db.pool.query(`Insert Into Equipments (equipmentName, equipmentCondition, rentalLength, itemCount) 
    Values ('${req.body.equipmentName}', '${req.body.equipmentCondition}', ${req.body.rentalLength}, ${req.body.itemCount});`, (err, result) => {
        if (err) {
            res.status(404).json({ Error: 'Not found' });
            console.log(err)
        } else {
            res.status(204).json({ message: 'Customer entry has been added to table' });
        }
    });
});

//Updates data in Equipments Page DB
app.put("/EquipmentsPage", (req, res) => {
    db.pool.query(`Update Equipments Set equipmentName = '${req.body.equipmentName}', equipmentCondition = '${req.body.equipmentCondition}', rentalLength = ${req.body.rentalLength}, 
    itemCount = ${req.body.itemCount} where equipmentID = ${req.body.equipmentID};`, (err, result) => {
        if (err) {
            res.status(404).json({ Error: 'Not found' });
            console.log(err)
        } else {
            res.status(204).json({ message: 'Intersection entry has been added to table' });
        }
    });
});

// Deletes data in Equipments Page DB
app.delete("/EquipmentsPage", (req, res) => {
    db.pool.query(`Delete from Equipments where equipmentID = ${req.body.equipmentID};`, (err, result) => {
        if (err) {
            res.status(404).json({ Error: 'Not found' });
            console.log(err)
        }
        res.status(204).send();
    });
});

/*
    Listner
*/
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
});