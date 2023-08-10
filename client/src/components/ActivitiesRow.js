// Schema for the Activities
function intersectionRow ({ entry }) {
    return (
        <tr>
            <td>{entry.activityID}</td>
            <td>{entry.activityName}</td>
        </tr>
        
    );
}

export default intersectionRow;