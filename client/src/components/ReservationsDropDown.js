// Drop Down Componenet for Reservations
function ReservationsDropDown ( { entry }) {

    return (
        <option value={entry.reservationID}>{entry.reservationID}</option>
    )

} 

export default ReservationsDropDown