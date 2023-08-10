// ActivitiesHasEquipments Component
import ActivitiesHasEquipmentsRow from './ActivitiesHasEquipmentsRow.js';


function ActivitiesHasEquipmentTable ({ intersection_table_entries}) {
    return (
        <table id="activitiesHasEquipments">
            <caption></caption>
            <thead>
                <tr>
                    <th>Pair ID</th>
                    <th>Activity ID</th>
                    <th>Activity Name</th>
                    <th>Equipment ID</th>
                    <th>Equipment Name</th>
                </tr>
            </thead>
            <tbody>
                {intersection_table_entries.map((entry, i) => 
                <ActivitiesHasEquipmentsRow
                    entry={entry}
                    key={i}
                />)}
            </tbody>
        </table>

    );


};


export default ActivitiesHasEquipmentTable;