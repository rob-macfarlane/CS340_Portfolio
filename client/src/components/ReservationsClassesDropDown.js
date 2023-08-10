// Drop Down Component for Classes in  Reservations Table
function ReservationsActivitesDropDown ( { entry }) {

    return (
        <option value={entry.classID}>{entry.className}</option>
    )

} 

export default ReservationsActivitesDropDown