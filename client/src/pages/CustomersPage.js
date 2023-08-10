import React from 'react';
import Axios from 'axios';
import '../App.css'
import CustomersTable from '../components/CustomersTable';
import { useState } from 'react';
import { useEffect } from 'react';
import CustomersDropDown from '../components/CustomersDropDown';

function CustomersPage() {

    // Initialize all the state variables 
    const [datas, setData] = useState([]);
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerName, setCustomerName] = useState('');

    const [Edit_customer_id, edit_Customer_id] = useState();
    const [Edit_customerEmail, edit_Customer_Email] = useState('');
    const [Edit_customerName, edit_Customer_Name] = useState('');

    const [Delete_customer_id, delete_Customer_id] = useState('');

    /*
        ROUTES
    */

    // Gets data from the database
    const getData = async () => {
        const response = await Axios.get('http://localhost:4567/CustomersPage');
        const intersection_data = await response.data;
        setData(intersection_data);

        // Sets default values of the state variables to the first shown value in the drop downs 
        edit_Customer_id(intersection_data[0].customerID);
        delete_Customer_id(intersection_data[0].customerID);

    };

    //Adds a row in the table
    const AddData = async () => {
        const response = await Axios.post('http://localhost:4567/CustomersPage', {
            "customerName": customerName,
            "customerEmail": customerEmail,
        })
        getData();

    }

    //Updates a row in the table
    const UpdateData = async () => {
        const response = await Axios.put('http://localhost:4567/CustomersPage', {
            "customerID": Edit_customer_id,
            "customerName": Edit_customerName,
            "customerEmail": Edit_customerEmail,
        })
        getData();
    }

    //Deletes a row in the table
    const DeleteData = async () => {
        const response = await Axios.delete('http://localhost:4567/CustomersPage', {
            data: { "customerID": Delete_customer_id }
        });
        getData();
    }

    //Cancel Button clears fields
    const CancelData = async () => {
        setCustomerEmail("");
        setCustomerName("");
        edit_Customer_Email("");
        edit_Customer_Name("");
        edit_Customer_id("");
        getData();
    }

    // Our effect is to update the table with the latest data
    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <h1>Customers Page</h1>
            <CustomersTable
                tableData={datas}
            />
            <fieldset>

                <legend>Perform Update / Add / Delete Actions for Customers</legend>

                {/* Add Form */}
                <form onSubmit={(e) => { e.preventDefault(); }}>
                    <p><label htmlFor="customerName">Customer Name:
                        <input
                            type="text"
                            name="customerName"
                            id="customerName"
                            size="30"
                            maxLength="100"
                            value={customerName}
                            required placeholder="Customer Name"
                            onChange={
                                (e) => setCustomerName(e.target.value)
                            }
                            autoFocus
                        />
                    </label>
                        <label htmlFor="customerEmail">Customer Email:
                            <input
                                type="text"
                                name="addEquipmentID"
                                id="addEquipmentID"
                                size="30"
                                maxLength="100"
                                value={customerEmail}
                                required placeholder="Customer Email"
                                onChange={
                                    (e) => setCustomerEmail(e.target.value)
                                }
                            />
                        </label>
                    </p>
                    <p>
                        <button type="button" onClick={AddData}>Add</button>
                        <button type="button" onClick={CancelData}>Cancel</button>
                    </p>
                </form>

                {/* Update Form */}
                <form onSubmit={(e) => { e.preventDefault(); }}>
                    <p>
                        <label htmlFor="customerID">Select an customer ID:</label>
                        <select name="customerID" id="customerID" onChange={(e) => edit_Customer_id(e.target.value)}>
                            {datas.map((entry, i) =>
                                <CustomersDropDown
                                    entry={entry}
                                    key={i}
                                />)}
                        </select>

                        <label htmlFor="customerName">Customer Name:
                            <input
                                type="text"
                                name="customerName"
                                id="customerName"
                                size="30"
                                maxLength="100"
                                value={Edit_customerName}
                                required placeholder="Customer Name"
                                onChange={
                                    (e) => edit_Customer_Name(e.target.value)
                                }
                            />
                        </label>
                        <label htmlFor="customerEmail">Customer Email:
                            <input
                                type="text"
                                name="customerEmail"
                                id="customerEmail"
                                size="30"
                                maxLength="100"
                                value={Edit_customerEmail}
                                required placeholder="Customer Email"
                                onChange={
                                    (e) => edit_Customer_Email(e.target.value)
                                }
                            />
                        </label>
                    </p>
                    <p>
                        <button type="button" onClick={UpdateData}>Save Edits</button>
                        <button type="button" onClick={CancelData}>Cancel</button>
                    </p>
                </form>

                {/* Delete Form */}
                <form onSubmit={(e) => { e.preventDefault(); }}>
                    <label htmlFor="customerID">Select a Pair ID:</label>
                    <select name="customerID" id="customerID" onChange={(e) => delete_Customer_id(e.target.value)}>
                        {datas.map((entry, i) =>
                            <CustomersDropDown
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
export default CustomersPage;