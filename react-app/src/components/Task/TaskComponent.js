
import "./task.css"

function TaskComponent ({task}){


    const convertDate = (date) => {
        let day = date.slice(5, 7)
        const months = {
            Jan: '01',
            Feb: '02',
            Mar: '03',
            Apr: '04',
            May: '05',
            Jun: '06',
            Jul: '07',
            Aug: '08',
            Sep: '09',
            Oct: '10',
            Nov: '11',
            Dec: '12',
          };
        let month = months[date.slice(8,11)]
        return `${month}/${day}`
    }

    return (
        <div className="sliceCont">
            {Object.values(task).map((t)=> {
                const priColor =
                t.priority === 'High' ? 'red' :
                t.priority === 'Med' ? 'yellow' :
                t.priority === 'Low' ? 'green' :
                'white';
                return (
                    <div className="taskTile">
                       <div
                       className="taskHeader">
                            <input
                                name="complete"
                                type="checkbox"
                            />

                            <div
                            className="taskDueDate">
                                {convertDate(t.due_date)}

                            </div>

                            <div
                            className="priorityCircle"
                            style={{backgroundColor: priColor}}>

                            </div>
                       </div>
                       <div className="TaskBody">
                            <p className="taskDescription">
                                {t.description}
                            </p>
                            <div className="taskClient" >
                                {`${t.Client.firstName} ${t.Client.lastName}`}
                            </div>
                       </div>


                    </div>
                )

            })}

        </div>
    )
}
export default TaskComponent
