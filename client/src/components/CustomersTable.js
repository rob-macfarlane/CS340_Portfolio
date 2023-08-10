// Customers Component
import CustomersRow from './CustomersRow.js';


function CustomersTable ({tableData}) {
    return (
        <table id="customersTable">
            <caption></caption>
            <thead>
                <tr>
                    <th>Customer ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Number of Reservations</th>
                </tr>
            </thead>
            <tbody>
                {tableData.map((entry, i) => 
                <CustomersRow
                    entry={entry}
                    key={i}
                />)}
            </tbody>
        </table>

    );


};

export default CustomersTable;