// Equipments Page with pre populated data
import React from 'react';
import Axios from 'axios';
import '../App.css'
import EquipmentsTable from '../components/EquipmentsTable';
import { useState } from 'react';
import { useEffect } from 'react';
import EquipmentsDropDown from '../components/EquipmentsDropDown';

function EquimentsPage() {

    // Initiialize our state Variables
    const [equipmentData, setEquipmentData] = useState([]);
    const [equipmentName, setEquipmentName] = useState('');
    const [equipmentCondition, setEquipmentCondition] = useState('');
    const [rentalLength, setRentalLength] = useState('');
    const [itemCount, setItemCount] = useState('');
    const [Edit_equipment_Data, editEquipmentData] = useState([]);
    const [Edit_equipmentName, editEquipmentName] = useState('');
    const [Edit_equipmentCondition, editEquipmentCondition] = useState('');
    const [Edit_rentalLength, editRentalLength] = useState('');
    const [Edit_itemCount, editItemCount] = useState('');
    const [Delete_equipment_Data, delete_equipment_data] = useState('');


    // Gets data from the database
    const getEquipmentData = async () => {
        const response = await Axios.get('http://localhost:4567/EquipmentsPage');
        const tableData = await response.data;
        setEquipmentData(tableData);

        //Updates default values of drop downs to be the first value in the drop down
        editEquipmentData(tableData[0].equipmentID);
        delete_equipment_data(tableData[0].equipmentID);
    };

        //Adds a row in the table
    const addEquipmentData = async () => {
        const response = await Axios.post('http://localhost:4567/EquipmentsPage', {
            "equipmentName": equipmentName,
            "equipmentCondition": equipmentCondition,
            "rentalLength": rentalLength,
            "itemCount": itemCount
        });
        getEquipmentData();
    };

    //Updates a row in the table
    const UpdateEquipmentData = async () => {
        const response = await Axios.put('http://localhost:4567/EquipmentsPage', {
            "equipmentID": Edit_equipment_Data,
            "equipmentName": Edit_equipmentName,
            "equipmentCondition": Edit_equipmentCondition,
            "rentalLength": Edit_rentalLength,
            "itemCount": Edit_itemCount
        })
        getEquipmentData();
    }

    //Deletes a row in the table
    const DeleteEquipmentData = async () => {
        const response = await Axios.delete('http://localhost:4567/EquipmentsPage', {
            data: { "equipmentID": Delete_equipment_Data }
        });
        getEquipmentData();
    }

    //Cancel Button clears fields
    const CancelData = async () => {
        setEquipmentName("");
        setEquipmentCondition("")
        setRentalLength("");
        setItemCount("");
        editEquipmentName("");
        editEquipmentCondition("");
        editRentalLength("")
        editItemCount("")
        getEquipmentData();
    }

    // Our effect is to update the table with the latest data
    useEffect(() => {
        getEquipmentData();

    });



    return (
        <>
            <h1>Equipment Page</h1>
            <EquipmentsTable
                tableData={equipmentData}
            />

            <fieldset>

                <legend>Perform Update / Add / Delete Actions for Equipment Items</legend>

                <form onSubmit={(e) => { e.preventDefault(); }}>
                    <p>
                        <label htmlFor="equipmentName">Equipment Name:
                            <input
                                type="text"
                                name="equipmentName"
                                id="equipmentName"
                                size="30"
                                maxLength="100"
                                required placeholder="Equipment Name"
                                autoFocus
                                value={equipmentName}
                                onChange={(e) => setEquipmentName(e.target.value)}
                            />
                        </label>
                        <label htmlFor="itemCondition">Item Condition:
                            <input
                                type="text"
                                name="itemCondition"
                                id="itemCondition"
                                size="30"
                                maxLength="100"
                                required placeholder="New"
                                value={equipmentCondition}
                                onChange={(e) => setEquipmentCondition(e.target.value)}
                            />
                        </label>
                        <label htmlFor="rentalLength">Rental Length (days):
                            <input
                                type="number"
                                name="rentalLength"
                                id="rentalLength"
                                size="30"
                                maxLength="100"
                                required placeholder="Number of Rental Days"
                                value={rentalLength}
                                onChange={(e) => setRentalLength(e.target.value)}

                            />
                        </label>
                        <label htmlFor="itemCount">Quantity:
                            <input
                                type="number"
                                name="itemCount"
                                id="itemCount"
                                size="30"
                                maxLength="100"
                                required placeholder="Item Quantity"
                                value={itemCount}
                                onChange={(e) => setItemCount(e.target.value)}

                            />
                        </label>

                    </p>
                    <p>
                        <button type="button" onClick={addEquipmentData}>Add</button>
                        <button type="button" onClick={CancelData}>Cancel</button>
                    </p>
                </form>

                {/* Update Form */}
                <form onSubmit={(e) => { e.preventDefault(); }}>
                    <p>
                        <label htmlFor="equipmentID">Select an Equipments ID:</label>
                        <select name="equipmentID" id="equipmentID" onChange={(e) => editEquipmentData(e.target.value)}>
                            {equipmentData.map((entry, i) =>
                                <EquipmentsDropDown
                                    entry={entry}
                                    key={i}
                                />)}
                        </select>

                        <label htmlFor="equipmentName">Equipment Name:
                            <input
                                type="text"
                                name="equipmentName"
                                id="equipmentName"
                                size="30"
                                maxLength="100"
                                value={Edit_equipmentName}
                                required placeholder="Equipment Name"
                                onChange={
                                    (e) => editEquipmentName(e.target.value)
                                }
                            />
                        </label>
                        <label htmlFor="equipmentCondition">Equipment Condition:
                            <input
                                type="text"
                                name="equipmentCondition"
                                id="equipmentCondition"
                                size="30"
                                maxLength="100"
                                value={Edit_equipmentCondition}
                                required placeholder="Equipment Condition"
                                onChange={
                                    (e) => editEquipmentCondition(e.target.value)
                                }
                            />
                        </label>
                        <label htmlFor="rentalLength">Rental Length:
                            <input
                                type="number"
                                name="rentalLength"
                                id="rentalLength"
                                size="30"
                                maxLength="100"
                                value={Edit_rentalLength}
                                required placeholder="Rental Length"
                                onChange={
                                    (e) => editRentalLength(e.target.value)
                                }
                            />
                        </label>
                        <label htmlFor="itemCount">Quantity:
                            <input
                                type="number"
                                name="itemCount"
                                id="itemCount"
                                size="30"
                                maxLength="100"
                                value={Edit_itemCount}
                                required placeholder="Item Quantity"
                                onChange={
                                    (e) => editItemCount(e.target.value)
                                }
                            />
                        </label>
                    </p>
                    <p>
                        <button type="button" onClick={UpdateEquipmentData}>Save Edits</button>
                        <button type="button" onClick={CancelData}>Cancel</button>
                    </p>
                </form>

                {/* Delete Form */}
                <form onSubmit={(e) => { e.preventDefault(); }}>
                    <label htmlFor="equipmentID">Select a Pair ID:</label>
                    <select name="equipmentID" id="equipmentID" onChange={(e) => delete_equipment_data(e.target.value)}>
                        {equipmentData.map((entry, i) =>
                            <EquipmentsDropDown
                                entry={entry}
                                key={i}
                            />)}
                    </select>

                    <p>
                        <button type="button" onClick={DeleteEquipmentData}>Delete Entry</button>
                        <button type="button">Cancel</button>
                    </p>
                </form>
            </fieldset>

        </>
    );
}

export default EquimentsPage;