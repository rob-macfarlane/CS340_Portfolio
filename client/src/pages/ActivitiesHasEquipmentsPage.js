import React from 'react';
import Axios from 'axios';
import '../App.css'
import ActivitiesHasEquipmentTable from '../components/ActivitiesHasEquipmentTable';
import { useState } from 'react';
import { useEffect } from 'react';
import ActivitiesHasEquipmentsDropDown from '../components/ActivitiesHasEquipmentsDropDown';



function ActivitiesHasEquipmentsPage() {

    // Initialize all the state variables 
    const [datas, setData] = useState([]);
    const [activity_id, set_activity_id] = useState('');
    const [equipment_id, set_equipment_id] = useState('');
    const [Edit_activity_id, edit_activity_id] = useState('')
    const [Edit_equipment_id, edit_equipment_id] = useState('')
    const [Edit_activitieshasequipments_id, edit_activitieshasequipments_id] = useState('')
    const [delete_activity_has_equipment_id, set_delete_activity_has_equipment_id] = useState('')
    const [equipmentData, setEquipmentData] = useState([]);
    const [activityData, setActivityData] = useState([]);

    
    /*
        ROUTES
    */

    // Gets data from the database
    const getData = async () => {
        const response = await Axios.get('http://localhost:4567/ActivitiesHasEquipmentsPage');
        const intersection_data = await response.data;
        setData(intersection_data);

        // Sets default values of the state variables to the first shown value in the drop downs 
        set_activity_id(intersection_data[0].activityID)
        set_equipment_id(intersection_data[0].equipmentID)
        set_delete_activity_has_equipment_id(intersection_data[0].activitiesHasEquipmentsID);
        edit_activitieshasequipments_id(intersection_data[0].activitiesHasEquipmentsID);
        edit_activity_id(intersection_data[0].activityID);
        edit_equipment_id(intersection_data[0].equipmentID);
    };

    // get data for the equipment only from the database
    const getEquipmentData = async () => {
        const response = await Axios.get('http://localhost:4567/EquipmentsPage');
        const tableData = await response.data;
        console.log(tableData)
        setEquipmentData(tableData);
        
        //Updates default values of drop downs to be the first value in the drop down

    };


    // get data for the activites only from the database
        // Gets data from the database
        const getActivityData = async () => {
            const response = await Axios.get('http://localhost:4567/ActivitiesPage');
            const intersection_data = await response.data;
            setActivityData(intersection_data);
            
        };


    //Adds a row in the table
    const AddData = async () => {
        const response = await Axios.post('http://localhost:4567/ActivitiesHasEquipmentsPage', {
            "equipmentID": equipment_id,
            "activityID": activity_id
        })
        getData();

    }

    //Updates a row in the table
    const UpdateData = async () => {
        const response = await Axios.put('http://localhost:4567/ActivitiesHasEquipmentsPage', {
            "activitiesHasEquipmentsID": Edit_activitieshasequipments_id,
            "equipmentID": Edit_equipment_id,
            "activityID": Edit_activity_id
        })
        getData();
    }

    //Deletes a row in the table
    const DeleteData = async () => {
        const response = await Axios.delete('http://localhost:4567/ActivitiesHasEquipmentsPage', {
            data: { "activitiesHasEquipmentsID": delete_activity_has_equipment_id }
        });
        getData();
    }

    //Cancel Button clears fields
    const CancelData = async () => {
        set_activity_id("");
        set_equipment_id("");
        edit_activity_id("");
        edit_equipment_id("");
        getData();
    }

    // Our effect is to update the table with the latest data
    useEffect(() => {
        getData();
        getEquipmentData();
        getActivityData();
 
    }, []);






    // Function used to find the matching row so the update activity prepopulates the fields
    const findRow = (search_ID) => {
        // Loop through the data, see if the reservation id in the Select Reservation ID field matches
        // one of the rows reservations ID. If it does, then update the state variables
        for (let i=0; i < datas.length; i++) {
            if (datas[i].activitiesHasEquipmentsID == search_ID) {
                edit_equipment_id(datas[i].equipmentID);
                edit_activity_id(datas[i].activityID);
                // if the value is null then make the form prefilled value blank
            };
        };

    };








    return (
        <>
            <h1>ActivitiesHasEquipments Page</h1>
            <ActivitiesHasEquipmentTable
                intersection_table_entries={datas}
            />
            <fieldset>

                <legend>Perform Update / Add / Delete Actions for ActivitiesHasEquipments</legend>

                {/* Add Form */}
                <form onSubmit={(e) => { e.preventDefault(); }}>
                    <p><label htmlFor="activityID">Activity Name:
                        <select
                            name="addActivityID"
                            id="addActivityID"
                            value={activity_id}
                            required placeholder="ActivityID"
                            onChange={
                                (e) => set_activity_id(e.target.value)
                            }
                            autoFocus
                        >
                            {activityData.map((line, key) => 
                            <ActivitiesHasEquipmentsDropDown
                                valueInfo={line.activityID}
                                label={line.activityName}
                                key={key}
                            />
                            )}
                        </select>
                    </label>
                        <label htmlFor="equipmentID">Equipment Name:
                            <select
                                name="addEquipmentID"
                                id="addEquipmentID"
                                value={equipment_id}
                                required placeholder="EquipmentID"
                                onChange={
                                    (e) => set_equipment_id(e.target.value)
                                }
                            >
                                {equipmentData.map((line, key) =>
                                <ActivitiesHasEquipmentsDropDown 
                                    valueInfo={line.equipmentID}
                                    label={line.equipmentName}
                                    key={key}
                                />)}
                            </select>
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
                        <label htmlFor="activitiesHasEquipmentsID">Select an ActivitiesHasEquipmentsID:</label>
                        <select name="activitiesHasEquipmentsID" id="activitiesHasEquipmentsID" value={Edit_activitieshasequipments_id} onChange={(e) => {edit_activitieshasequipments_id(e.target.value); findRow(e.target.value)}}>
                            {datas.map((entry, i) =>
                                <ActivitiesHasEquipmentsDropDown
                                    valueInfo={entry.activitiesHasEquipmentsID}
                                    label={entry.activitiesHasEquipmentsID}
                                    key={i}
                                />)}
                        </select>

                        <label htmlFor="activityID">Activity Name:
                            <select
                                name="updateActivityID"
                                id="updateActivityID"
                                value={Edit_activity_id}
                                required placeholder="Activity ID"
                                onChange={
                                    (e) => {edit_activity_id(e.target.value)
                                    }
                                }
                            >
                                {activityData.map((line, key) => 
                                <ActivitiesHasEquipmentsDropDown 
                                    label={line.activityName}
                                    valueInfo={line.activityID}
                                    key={key}
                                />)}
                            </select>
                        </label>
                        <label htmlFor="equipmentID">Equipment Name:
                            <select
                                name="updateEquipmentID"
                                id="updateEquipmentID"
                                value={Edit_equipment_id}
                                required placeholder="Equipment ID"
                                onChange={
                                    (e) => edit_equipment_id(e.target.value)
                                }
                            >
                                {equipmentData.map((line, key) => 
                                <ActivitiesHasEquipmentsDropDown 
                                    label={line.equipmentName}
                                    valueInfo={line.equipmentID}
                                    key={key}
                                />)}
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
                    <label htmlFor="activityID">Select a Pair ID:</label>
                    <select name="activityID" id="activityID" onChange={(e) => set_delete_activity_has_equipment_id(e.target.value)}>
                        {datas.map((entry, i) =>
                            <ActivitiesHasEquipmentsDropDown
                                valueInfo={entry.activitiesHasEquipmentsID}
                                label={entry.activitiesHasEquipmentsID}
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
export default ActivitiesHasEquipmentsPage;