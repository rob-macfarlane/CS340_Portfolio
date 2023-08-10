// Equipments Component
import EquipmentsRow from './EquipmentsRow.js';


function EquipmentsTable ({tableData}) {
    return (
        <table id="equipmentsTable">
            <caption></caption>
            <thead>
                <tr>
                    <th>Equipment ID</th>
                    <th>Equipment Name</th>
                    <th>Condition</th>
                    <th>Rental Length</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                {tableData.map((entry, i) => 
                <EquipmentsRow
                    entry={entry}
                    key={i}
                />)}
            </tbody>
        </table>

    );


};

export default EquipmentsTable;