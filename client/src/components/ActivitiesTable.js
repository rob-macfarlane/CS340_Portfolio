// Activities Component
import ActivitiesRow from './ActivitiesRow.js';


function ActivitiesTable ({intersection_table_entries}) {
    return (
        <table id="activitiesTable">
            <caption></caption>
            <thead>
                <tr>
                    <th>Activity ID</th>
                    <th>Activity</th>
                </tr>
            </thead>
            <tbody>
                {intersection_table_entries.map((entry, i) => 
                <ActivitiesRow
                    entry={entry}
                    key={i}
                />)}
            </tbody>
        </table>

    );


};

export default ActivitiesTable;