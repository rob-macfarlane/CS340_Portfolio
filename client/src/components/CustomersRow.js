// Schema for the Customers
function CustomersRow ({ entry }) {
    return (
        <tr>
            <td>{entry.customerID}</td>
            <td>{entry.customerName}</td>
            <td>{entry.customerEmail}</td>
            <td>{entry.numberReservations}</td>
        </tr>
        
    );
}

export default CustomersRow;