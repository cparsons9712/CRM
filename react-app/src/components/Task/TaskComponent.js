
import "./task.css"
import TaskDetails from "./details";
import { useModal } from "../../context/Modal";
import { useEffect, useState } from "react";
import { updateTask} from "../../store/task";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronDown} from '@fortawesome/free-solid-svg-icons';



function TaskComponent ({task}){
    const dispatch = useDispatch()

    const { setModalContent } = useModal();


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
    const handleTaskClick = (t) => {
        setModalContent(<TaskDetails task={t} />);
    }



    const getColor = (priority) => {
        if (priority === 'High'){
            return 'red'
        }else if (priority === 'Med'){
            return 'yellow'
        }else{
            return 'green'
        }

    }

    if( task.length){
        console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
        console.log('COMPLETE TASK OBJECT:::', task)
        return (
            <div className="sliceCont">

                {task.map((t)=> {
                    console.log('INDV TASK::::', t)
                    if(t && t.completed === false){
                    return (
                        <div className="taskTile" key={t.id}>
                            <div
                            className="taskHeader">
                            <input
                                name="complete"
                                type="checkbox"
                                id={`complete_${t.completed}`}
                                checked={t.completed}
                                onChange={(e)=> {
                                    alert('checkbox change')
                                    console.log('$$$$$$$$$$')
                                    console.log(`task::::`, t)
                                    const checkedTask = {

                                        ...t,
                                        completed: !t.completed,
                                        due_date: t.due_date ? new Date(t.due_date).toISOString().split('T')[0] : null,
                                    }
                                    dispatch(updateTask(t.id, checkedTask))
                                }}
                            />

                            <div
                            className="taskDueDate">
                                {t?.due_date ? convertDate(t.due_date) : "none"}


                            </div>

                            <div
                            className="priorityCircle"
                            style={{color: getColor(t.priority)}}
                            onClick={()=>{handleTaskClick(t)}}
                            >
                               <FontAwesomeIcon icon={faCircleChevronDown} />
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
                )}

            })}

        </div>
    )}else{return <div className="sliceCont"></div>}
}
export default TaskComponent
