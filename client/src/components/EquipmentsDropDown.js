// Drop Down Component for Equipments Table
function EquipmentsDropDown ( { entry }) {

    return (
        <option value={entry.equipmentID}>{entry.equipmentID}</option>
    )

} 


export default EquipmentsDropDown