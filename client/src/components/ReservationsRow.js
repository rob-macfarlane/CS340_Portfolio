// Schema for the Reservations
function intersectionRow ({ entry }) {
    return (
        <tr>
            <td>{entry.reservationID}</td>
            <td>{entry.customerID}</td>
            <td>{entry.customerName}</td>
            <td>{entry.activityID}</td>
            <td>{entry.activityName}</td>
            <td>{entry.rentalStart}</td>
            <td>{entry.classID}</td>
            <td>{entry.className}</td>
        </tr>
        
    );
}

export default intersectionRow;