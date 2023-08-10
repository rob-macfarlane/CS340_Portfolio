// Schema for the table
function intersectionRow ({ entry }) {
    return (
        <tr>
            <td>{entry.activitiesHasEquipmentsID}</td>
            <td>{entry.activityID}</td>
            <td>{entry.activityName}</td>
            <td>{entry.equipmentID}</td>
            <td>{entry.equipmentName}</td>
        </tr>
        
    );
}

export default intersectionRow;