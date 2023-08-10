import React from 'react';
import Axios from 'axios';
import '../App.css'
import ActivitiesTable from '../components/ActivitiesTable';
import { useState } from 'react';
import { useEffect } from 'react';
import ActivitiesDropDown from '../components/ActivitiesDropDown';

function ActivitiesPage() {

    // Initialize all the state variables 
    const [datas, setData] = useState([]);
    const [activity_id, set_activity_id] = useState('');
    const [activity_name, set_activity_name] = useState('');
    const [Edit_activity_id, edit_activity_id] = useState('');
    const [Edit_activity_name, edit_activity_name] = useState('');


    /*
        ROUTES
    */

    // Gets data from the database
    const getData = async () => {
        const response = await Axios.get('http://localhost:4567/ActivitiesPage');
        const intersection_data = await response.data;
        setData(intersection_data);

        //Updates default values of drop downs to be the first value in the drop down
        set_activity_id(intersection_data[0].activityID);
        edit_activity_id(intersection_data[0].activityID)

    };

    //Adds a row in the table
    const AddData = async () => {
        const response = await Axios.post('http://localhost:4567/ActivitiesPage', {
            "activityName": activity_name
        })
        getData();

    }

    //Updates a row in the table
    const UpdateData = async () => {
        const response = await Axios.put('http://localhost:4567/ActivitiesPage', {
            "activityID": Edit_activity_id,
            "activityName": Edit_activity_name
        })
        getData();
    }

    //Deletes a row in the table
    const DeleteData = async () => {
        const response = await Axios.delete('http://localhost:4567/ActivitiesPage', {
            data: { "activityID": activity_id }
        });
        getData();
    }

    //Cancel Button clears fields
    const CancelData = async () => {
        set_activity_name("");
        edit_activity_name("")
        getData();
        
    }

    // Our effect is to update the table with the latest data
    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <h1>Activities Page</h1>
            <ActivitiesTable
                intersection_table_entries={datas}
            />
            <fieldset>
                <legend>Perform Update / Add / Delete Actions for Activities</legend>

                {/* Add an Activity */}
                <form onSubmit={(e) => { e.preventDefault(); }}></form>
                <p>
                    <label htmlFor="activityName">Activity Name:
                        <input type="text"
                            name="addActivity"
                            id="addActivity"
                            size="30"
                            maxLength="100"
                            value={activity_name}
                            required placeholder="Activity Name"
                            onChange={
                                (e) => set_activity_name(e.target.value)
                            }
                            autoFocus />
                    </label>
                </p>
                <p>
                    <button type="button" onClick={AddData}>Add</button>
                    <button type="button" onClick={CancelData}>Cancel</button>
                </p>
                {/* Update Form */}
                <form onSubmit={(e) => { e.preventDefault(); }}>
                    <p>
                        <label htmlFor="activities">Select an Activities ID:</label>
                        <select name="activitiesID" id="activitiesHID" onChange={(e) => edit_activity_id(e.target.value)}>
                            {datas.map((entry, i) =>
                                <ActivitiesDropDown
                                    entry={entry}
                                    key={i}
                                />)}
                        </select>
                        <label htmlFor="activityName">Activity Name:
                            <input
                                type="text"
                                name="updateEquipmentID"
                                id="updateEquipmentID"
                                size="30"
                                maxLength="100"
                                value={Edit_activity_name}
                                required placeholder="Activity Name"
                                onChange={
                                    (e) => edit_activity_name(e.target.value)
                                }
                            />
                        </label>
                    </p>
                    <p>
                        <button type="button" onClick={UpdateData}>Save Edits</button>
                        <button type="button" onClick={CancelData}>Cancel</button>
                    </p>
                </form>
                {/* Delete an Activity */}
                <form onSubmit={(e) => { e.preventDefault(); }}>
                    <label htmlFor="deleteactivities">Select an Activity:</label>

                    <select name="deleteactivities" id="deleteactivities" onChange={(e) => set_activity_id(e.target.value)}>
                        {datas.map((entry, i) =>
                            <ActivitiesDropDown
                                entry={entry}
                                key={i}
                            />)}
                    </select>
                    <p>
                        <button type="button" onClick={DeleteData}>Delete Activity</button>
                        <button type="button">Cancel</button>
                    </p>
                </form>
            </fieldset>

        </>
    );

}


export default ActivitiesPage
