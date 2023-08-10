// Classes Page with pre populated data
import React from 'react';
// import React,{useState,useEffect} from 'react'
import Axios from 'axios';
//import {useHistory} from 'react-router-dom'
import '../App.css'
// var app = express();
import ClassesTable from '../components/ClassesTable';
import { useState } from 'react';
import { useEffect } from 'react';
import ClassesDropDown from '../components/ClassesDropDown';

function ClassesPage() {
    // Initialize all the state variables 
    const [datas, setData] = useState([]);
    const [class_id, set_class_id] = useState('');
    const [class_name, set_class_name] = useState('');
    const [class_date, set_class_date] = useState('');
    const [class_capacity, set_class_capacity] = useState('');
    const [Edit_class_name, edit_class_name] = useState('');
    const [Edit_class_date, edit_class_date] = useState('');
    const [Edit_class_capacity, edit_class_capacity] = useState('');
    const [Delete_class_id, delete_class_id] = useState('');

    /*
           ROUTES
       */

    // Gets data from the database
    const getData = async () => {
        const response = await Axios.get('http://localhost:4567/ClassesPage');
        const intersection_data = await response.data;
        setData(intersection_data);

        //Updates default values of drop downs to be the first value in the drop down
        set_class_id(intersection_data[0].classID);
        delete_class_id(intersection_data[0].classID);
    }

    //Adds a row in the table
    const AddData = async () => {

        const response = await Axios.post('http://localhost:4567/ClassesPage', {
            "className": class_name,
            "classDate": class_date,
            "currentCapacity": class_capacity
        })
        getData();

    }
    //Updates a row in the table
    const UpdateData = async () => {
        const response = await Axios.put('http://localhost:4567/ClassesPage', {
            "classID": class_id,
            "className": Edit_class_name,
            "classDate": Edit_class_date,
            "currentCapacity": Edit_class_capacity
        })
        getData();
    }

    //Deletes a row in the table
    const DeleteData = async () => {
        const response = await Axios.delete('http://localhost:4567/ClassesPage', {
            data: { "classID": Delete_class_id }
        });
        getData();
    }

    //Cancel Button clears fields
    const CancelData = async () => {
        set_class_name("");
        set_class_date("")
        set_class_capacity("");
        edit_class_name("");
        edit_class_date("");
        edit_class_capacity("");
        getData();
    }

    // Our effect is to update the table with the latest data
    useEffect(() => {
        getData();
    }, []);
    return (
        <>
            <h1>Classes Page</h1>
            <ClassesTable
                intersection_table_entries={datas}
            />

            <fieldset>

                <legend>Perform Update / Add / Delete Actions for Classes</legend>
                <form onSubmit={(e) => { e.preventDefault(); }}>
                    <p>
                        <label htmlFor="classeName">Class Name:
                            <input type="text"
                                name="className"
                                id="className"
                                size="30"
                                maxLength="100"
                                value={class_name}
                                onChange={
                                    (e) => set_class_name(e.target.value)
                                }
                                required placeholder="Class Name"
                                autoFocus />
                        </label>
                        <label htmlFor="classDate">Class Date:
                            <input type="date"
                                name="classDate"
                                id="classDate"
                                size="30"
                                maxLength="100"
                                required placeholder="Class Date"
                                value={class_date}
                                onChange={
                                    (e) => set_class_date(e.target.value)
                                }
                            />
                        </label>
                        <label htmlFor="currentCapcity">Current Capcity:
                            <input type="number"
                                name="currentCapcity"
                                id="currentCapcity"
                                size="30"
                                maxLength="100"
                                value={class_capacity}
                                onChange={
                                    (e) => set_class_capacity(e.target.value)
                                }
                                required placeholder="Current Capcity"
                            />
                        </label>
                    </p>
                    <p>
                        <button type="button" onClick={AddData}>Add</button>
                        <button type="button" onClick={CancelData}>Cancel</button>
                    </p>
                </form>

                <form onSubmit={(e) => { e.preventDefault(); }}>
                    <p>

                        <label htmlFor="classID">Select a ClassID:</label>
                        <select name="classID" id="classID" onChange={(e) => set_class_id(e.target.value)}>
                            {datas.map((entry, i) =>
                                <ClassesDropDown
                                    entry={entry}
                                    key={i}
                                />)}
                        </select>
                        <label htmlFor="classeName">Update Class Name:
                            <input type="text"
                                name="updateClassName"
                                id="updateCustomerName"
                                size="30"
                                maxLength="100"
                                value={Edit_class_name}
                                required placeholder="Class Name"
                                onChange={
                                    (e) => edit_class_name(e.target.value)
                                }
                            />
                        </label>
                        <label htmlFor="classDate">Class Date:
                            <input type="date"
                                name="updateClassDate"
                                id="updateClassDate"
                                size="30"
                                maxLength="100"
                                value={Edit_class_date}
                                required placeholder="Class Date"
                                onChange={
                                    (e) => edit_class_date(e.target.value)
                                }
                            />
                        </label>
                        <label htmlFor="classCapacity">Class Capacity:
                            <input type="number"
                                name="updateClassDate"
                                id="updateClassDate"
                                size="30"
                                maxLength="100"
                                value={Edit_class_capacity}
                                required placeholder="Class Capacity"
                                onChange={
                                    (e) => edit_class_capacity(e.target.value)
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
                    <label htmlFor="classID">Select a Class ID:</label>
                    <select name="classID" id="classID" onChange={(e) => delete_class_id(e.target.value)}>
                        {datas.map((entry, i) =>
                            <ClassesDropDown
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

export default ClassesPage;