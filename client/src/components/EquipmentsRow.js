// Schema for the Equipments
function EquipmentsRow ({ entry }) {
    return (
        <tr>
            <td>{entry.equipmentID}</td>
            <td>{entry.equipmentName}</td>
            <td>{entry.equipmentCondition}</td>
            <td>{entry.rentalLength}</td>
            <td>{entry.itemCount}</td>
        </tr>
        
    );
}

export default EquipmentsRow;