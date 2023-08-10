// Schema for the Classes
function intersectionRow ({ entry }) {
    
    return (
        <tr>
            <td>{entry.classID}</td>
            <td>{entry.className}</td>
            <td>{entry.classDate}</td>
            <td>{entry.currentCapacity}</td>
        </tr>
        
    );
}

export default intersectionRow;