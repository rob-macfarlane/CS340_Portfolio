// Drop Down component for Customers Table
function CustomersDropDown ( { entry }) {

    return (
        <option value={entry.customerID}>{entry.customerID}</option>
    )

} 


export default CustomersDropDown