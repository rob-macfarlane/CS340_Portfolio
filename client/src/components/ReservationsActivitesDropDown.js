// Drop Down Component for Activities in  Reservations Table
function ReservationsActivitesDropDown ( { entry }) {

    return (
        <option value={entry.activityID}>{entry.activityName}</option>
    )

} 

export default ReservationsActivitesDropDown