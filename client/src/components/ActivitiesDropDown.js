// Drop Down Component for Activities Table
function ActivitiesDropDown ( { entry }) {

    return (
        <option value={entry.activityID}>{entry.activityID}</option>
    )

} 


export default ActivitiesDropDown