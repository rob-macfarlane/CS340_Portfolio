// Drop Down Component for Customers in  Reservations Table
function ReservationsCustomersDropDown ( { entry }) {

        
    return (
        <option value={entry.customerID}>{entry.customerName}</option>
    )

} 

export default ReservationsCustomersDropDown