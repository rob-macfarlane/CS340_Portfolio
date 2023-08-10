// Classes Component
import ClassesRow from './ClassesRow.js';

function ClassesTable ({intersection_table_entries}) {
    return (
        <table id="classesTable">
            <caption></caption>
            <thead>
                <tr>
                    <th>Class ID</th>
                    <th>Name</th>
                    <th>Date and Time</th>
                    <th>Capacity</th>
                </tr>
            </thead>
            <tbody>
                {intersection_table_entries.map((entry, i) => 
                <ClassesRow
                    entry={entry}
                    key={i}
                />)}
            </tbody>
        </table>

    );


};

export default ClassesTable;