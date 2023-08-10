// Reservations Component
import ReservationsRow from './ReservationsRow.js';

// Reservations Component
function ReservationTable ({intersection_table_entries}) {
    return (
        <table id="reservationTable">
            <caption></caption>
            <thead>
                <tr>
                    <th>Reservation ID</th>
                    <th>Customer ID</th>
                    <th>Customer Name</th>
                    <th>Activity ID</th>
                    <th>Activity Name</th>
                    <th>Date Checked Out</th>
                    <th>Class ID</th>
                    <th>ClassName</th>
                </tr>
            </thead>
            <tbody>
                {intersection_table_entries.map((entry, i) => 
                <ReservationsRow
                    entry={entry}
                    key={i}
                />)}
            </tbody>
        </table>

    );


};

export default ReservationTable;