
import "./task.css"
import TaskDetails from "./details";
import { useModal } from "../../context/Modal";
import { useEffect, useState } from "react";
import { updateTask, completeTask} from "../../store/task";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion} from '@fortawesome/free-solid-svg-icons';
import { convertDate } from "../../util";


function TaskComponent ({task}){
    const dispatch = useDispatch()

    const { setModalContent } = useModal();


    const handleTaskClick = (t) => {
        setModalContent(<TaskDetails task={t} />);
    }



    const getColor = (priority) => {
        if (priority === 'High'){
            return '#A90505'
        }else if (priority === 'Med'){
            return '#F7CA41'
        }else{
            return '#396031'
        }

    }

    if( task.length){

        return (
            <div className="sliceCont">

                {task.map((t)=> {

                    if(t && t.completed === false){
                    return (
                        <div className="taskTile" key={t.id}>
                            <div
                            className="taskHeader">
                            <input
                                name="complete"
                                type="checkbox"
                                className="markComplete"
                                id={`complete_${t.completed}`}
                                checked={t.completed}
                                onChange={(e)=> {
                                    let check = window.confirm("Do you want to mark this task completed and hide from view? \nNote: Task will not be deleted, just hidden")
                                    if (check){
                                        dispatch(completeTask(t.id))
                                    }
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
                               <FontAwesomeIcon icon={faCircleQuestion} />
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
                )}else {
                    return null
                }

            })}

        </div>
    )}else{return <div className="sliceCont"></div>}
}
export default TaskComponent
