// Reservations Page with pre populated data
import React from 'react';
import Axios from 'axios';
import '../App.css'
import ReservationsTable from '../components/ReservationsTable';
import { useState } from 'react';
import { useEffect } from 'react';
import ReservationsDropDown from '../components/ReservationsDropDown';
import ReservationsCustomersDropDown from '../components/ReservationsCustomersDropDown';
import ReservationsActivitesDropDown from '../components/ReservationsActivitesDropDown';
import ReservationsClassesDropDown from '../components/ReservationsClassesDropDown';

function ReservationsPage() {

    // Initialize all the state variables 
    const [datas, setData] = useState([]);
    const [reservation_id, set_reservation_id] = useState('');
    const [customer_id, set_customer_id] = useState([]);
    const [activity_id, set_activity_id] = useState([]);
    const [rental_start, set_rental_start] = useState('');
    const [class_id, set_class_id] = useState('');
    const [Edit_reservation_id, edit_reservation_id] = useState('');
    const [Edit_customer_id, edit_customer_id] = useState('');
    const [Edit_activity_id, edit_activity_id] = useState('');
    const [Edit_rental_start, edit_rental_start] = useState('');
    const [Edit_class_id, edit_class_id] = useState('');
    const [Delete_reservation_id, delete_reservation_id] = useState('');
    const [Get_customer_id, get_customer_id] = useState([]);
    const [Get_activity_id, get_activity_id] = useState([]);
    const [Get_class_id, get_class_id] = useState([]);
    

    /*
           ROUTES
       */

    // Gets data from the database
    const getData = async () => {
        const response = await Axios.get('http://localhost:4567/ReservationsPage');
        const intersection_data = await response.data;
        setData(intersection_data);

          //Updates default values of drop downs to be the first value in the drop down
        set_reservation_id(intersection_data[0].reservationID);
        edit_reservation_id(intersection_data[0].reservationID);
        edit_customer_id(intersection_data[0].customerID);
        edit_activity_id(intersection_data[0].activityID);
        edit_rental_start(intersection_data[0].rentalStart);
        edit_class_id(intersection_data[0].classID);
        getCustomerID();
        getClassID();
        getActivityID(); 
        const cust_ID = await getCustomerID();
        set_customer_id(cust_ID[0].customerID)
        const act_ID = await getActivityID();
        set_activity_id('null');
        const class_ID = await getClassID();
        set_class_id('null');
        delete_reservation_id(intersection_data[0].reservationID);
    }


    //Adds a row in the table
   
    const AddData = async () => {
        const response = await Axios.post('http://localhost:4567/ReservationsPage', {
            "classID": class_id,
            "activityID": activity_id,
            "customerID": customer_id,
            "rentalStart": rental_start,
            "reservationID": reservation_id
        })

       // set_customer_id(getCustomerID());
        getData();
        
    }

    //Updates a row in the table
    const UpdateData = async () => {
        const response = await Axios.put('http://localhost:4567/ReservationsPage', {
            "reservationID": Edit_reservation_id,
            "customerID": Edit_customer_id,
            "activityID": Edit_activity_id,
            "rentalStart": Edit_rental_start,
            "classID": Edit_class_id
        })
        //set_customer_id(getCustomerID());
        getData();
        
    }
    //Deletes a row in the table
    const DeleteData = async () => {
        const response = await Axios.delete('http://localhost:4567/ReservationsPage', {
            data: { "reservationID": Delete_reservation_id }
        });
        //set_customer_id(getCustomerID());
        getData();
        
    }

    //Gets a list of all the Customer ID's from the Customers Table
    const getCustomerID = async () => {
        const response = await Axios.get('http://localhost:4567/ReservationsPage/CustomersID');
        const intersection_data = await response.data;
        get_customer_id(intersection_data)
        return intersection_data
        
    }

    //Gets a list of all the Activity ID's from the Activities Table
    const getActivityID = async () => {
        const response = await Axios.get('http://localhost:4567/ReservationsPage/ActivityID');
        const intersection_data = await response.data;
        get_activity_id(intersection_data)
        return intersection_data
        
    }

    //Gets a list of all the Class ID's from the Classes Table
    const getClassID = async () => {
        const response = await Axios.get('http://localhost:4567/ReservationsPage/ClassID');
        const intersection_data = await response.data;
        get_class_id(intersection_data)
        return intersection_data
    
}
    //Cancel Button clears fields
    const CancelData = async () => {
        set_class_id("");
        set_rental_start("")
        edit_customer_id("");
        edit_activity_id("");
        edit_rental_start("");
        edit_class_id("");
        getData();
        
    }

    // Our effect is to update the table with the latest data
    useEffect(() => {
        getData();
    }, [reservation_id]);


    // Function used to find the matching row so the update activity prepopulates the fields
    const findRow = (Edit_reservation_id) => {
        // Loop through the data, see if the reservation id in the Select Reservation ID field matches
        // one of the rows reservations ID. If it does, then update the state variables
        for (let i=0; i < datas.length; i++) {
            if (datas[i].reservationID == Edit_reservation_id) {
                edit_reservation_id(datas[i].reservationID);
                edit_customer_id(datas[i].customerID);
                edit_rental_start(datas[i].rentalStart);
                // if the value is null then make the form prefilled value blank
                if (datas[i].activityID === null) {
                    edit_activity_id('')
                } else {
                    edit_activity_id(datas[i].activityID);
                }
                if (datas[i].classID === null) {
                    edit_class_id('')
                } else {
                    edit_class_id(datas[i].classID);
                }
            };
        };

    };

    return (
        <>
            <h1>Reservations Page</h1>
            <ReservationsTable
                intersection_table_entries={datas}
            />

            <fieldset>

                <legend>Perform Update / Add / Delete Actions for Reservtions</legend>
                <form onSubmit={(e) => { e.preventDefault(); }}>
                    <p>
                    <label htmlFor="customerID">Customer Name:</label>
                    <select 
                            name="customerID" 
                            id="customerID" 
                            defaultValue={Object.values(Get_customer_id)[0]}
                            onChange={
                                (e) => {set_customer_id(e.target.value)
                                     }
                            }
                        >
                            {Object.values(Get_customer_id).map((entry, i) =>
                                <ReservationsCustomersDropDown
                                    entry={entry}
                                    key={i}
                                />)}
                        </select>
                        <label htmlFor="activityID">Activity:</label>
                        <select 
                            name="activityID" 
                            id="activityID" 
                            onChange={
                                (e) => {set_activity_id(e.target.value)
                                    findRow(e.target.value) }
                            }
                        >
                            <option value="null"></option>
                            {Object.values(Get_activity_id).map((entry, i) =>
                                <ReservationsActivitesDropDown
                                    entry={entry}
                                    key={i}
                                />)}
                        </select>
                        <label htmlFor="rentalStart">Rental Start:
                            <input type="date"
                                name="rentalStart"
                                id="rentalStart"
                                size="30"
                                maxLength="100"
                                value={rental_start}
                                required placeholder="Rental Start"
                                onChange={
                                    (e) => set_rental_start(e.target.value)
                                }
                                autoFocus />
                        </label>
                        <label htmlFor="classID">Class:</label>
                        <select 
                            name="classID" 
                            id="classID" 
                            onChange={
                                (e) => {set_class_id(e.target.value)
                                    findRow(e.target.value) }
                            }
                        >
                            <option value="null"></option>
                            {Object.values(Get_class_id).map((entry, i) =>
                                <ReservationsClassesDropDown
                                    entry={entry}
                                    key={i}
                                />)}
                        </select>
                    </p>
                    <p>
                        <button type="button" onClick={AddData}>Add</button>
                        <button type="button" onClick={CancelData}>Cancel</button>
                    </p>
                </form>

                {/* Update an entry */}
                <form onSubmit={(e) => { e.preventDefault(); }}>
                    <p>
                        <label htmlFor="reservationID">Select a ReservationID:</label>

                        <select 
                            name="reservationID" 
                            id="reservationID" 
                            onChange={
                                (e) => {edit_reservation_id(e.target.value)
                                    console.log(`This is the Edit Reservation ID Value: ${Edit_reservation_id}`)
                                    findRow(e.target.value) }
                            }
                        >
                            {datas.map((entry, i) =>
                                <ReservationsDropDown
                                    entry={entry}
                                    key={i}
                                />)}
                        </select>

                        <label htmlFor="customerID">Customer Name:
                            
                            <select 
                                name="updateCustomerID"
                                id="updateCustomerID"
                                value={Edit_customer_id}
                                required placeholder="Customer ID"
                                onChange={
                                    (e) => {edit_customer_id(e.target.value)
                                    }
                                }>
                                
                                {Object.values(Get_customer_id).map((entry, i) =>
                                <ReservationsCustomersDropDown
                                    entry={entry}
                                    key={i}
                                />)}
                            </select>  
                        </label>

                        <label htmlFor="activityID">Activity:
                            <select
                                name="updateActivityID"
                                id="updateActivityID"
                                value={Edit_activity_id}
                                onChange={
                                    (e) => edit_activity_id(e.target.value)
                                }>
                                <option value="null">N/A</option>
                                {Object.values(Get_activity_id).map((entry, i) =>
                                    <ReservationsActivitesDropDown
                                        entry={entry}
                                        key={i}
                                    />)
                                }
                            </select>
                        </label>
                        <label htmlFor="rentalStart">Update Rental Start:
                            <input type="date"
                                name="updateRentalStart"
                                id="updateRentalStart"
                                size="30"
                                maxLength="100"
                                value={Edit_rental_start}
                                required placeholder="Rental Start"
                                onChange={
                                    (e) => edit_rental_start(e.target.value)
                                }
                                autoFocus />
                        </label>
                        <label htmlFor="classID">Class:
                            <select
                                name="updateClassID"
                                id="updateClassID"
                                value={Edit_class_id}
                                required placeholder="Class ID"
                                onChange={
                                    (e) => edit_class_id(e.target.value)
                                }>
                                <option value="null">N/A</option>
                                {Object.values(Get_class_id).map((entry, i) =>
                                    <ReservationsClassesDropDown
                                        entry={entry}
                                        key={i}
                                    />)}
                                {/* <option value="null">None</option> */}
                            </select>
                                 
                        </label>
                    </p>
                    <p>
                        <button type="button" onClick={UpdateData}>Save Edits</button>
                        <button type="button" onClick={CancelData}>Cancel</button>
                    </p>
                </form>
                {/* Delete Form */}
                <form onSubmit={(e) => { e.preventDefault(); }}>
                    <label htmlFor="reservationID">Select a Reservation:</label>
                    <select name="reservationID" id="reservationID" onChange={(e) => delete_reservation_id(e.target.value)}>
                        {datas.map((entry, i) =>
                            <ReservationsDropDown
                                entry={entry}
                                key={i}
                            />)}
                    </select>

                    <p>
                        <button type="button" onClick={DeleteData}>Delete Entry</button>
                        <button type="button">Cancel</button>
                    </p>
                </form>
            </fieldset>
        </>
    );
}

export default ReservationsPage;