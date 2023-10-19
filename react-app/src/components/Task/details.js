import EditCreateTask from "./create_edit"
import { useModal } from "../../context/Modal"
import { useDispatch } from "react-redux";
import { removeTask , loadAllTask, completeTask} from "../../store/task";
import { convertDate, convertPhone, convertTime } from "../../util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileSignature, faImagePortrait, faTriangleExclamation, faListCheck, faCalendarDays } from "@fortawesome/free-solid-svg-icons";


function TaskDetails ({task}){
    const dispatch = useDispatch();
    const { setModalContent, closeModal } = useModal();


    const handleDelete =() =>{
        if(window.confirm('Are you sure you want to delete this task?')) {
            dispatch(removeTask(task.id));
            dispatch(loadAllTask());
        }
        closeModal()
    }

    const handleComplete = () =>{
        dispatch(completeTask(task.id));
        // dispatch(loadAllTask());
        closeModal()
    }



    return(
        <div className="taskDetailsCont">
            <div className="formHeading">
                <div className="componentTitle orange">To Do:</div>
            </div>

            <div className="detailsContent">
                <div className="taskSection">
                    <FontAwesomeIcon icon={faFileSignature} className="icon" />

                    <div>{task?.description}</div>
                </div>

                <div className="taskSection">
                    <FontAwesomeIcon icon={faImagePortrait} className="icon"/>
                    {task.Client ?    <>
                    <div >{task?.Client?.firstName} {task?.Client?.lastName}</div>
                    <div >{task?.Client?.email} </div>
                        <div>{convertPhone(task.Client.phoneNumber) }</div>
                  </>  : <> No Client</> }
                </div>

                <div className="taskSection">
                <FontAwesomeIcon icon={faTriangleExclamation} className="icon" />
                    <div>{task?.priority} Priority</div>
                </div>

                <div className="taskSection">
                <FontAwesomeIcon icon={faListCheck} className="icon"/>
                    <div>{task?.completed? "Completed": "In Progress"}</div>
                </div>

                <div className="taskSection">
                <FontAwesomeIcon icon={faCalendarDays} className="icon"/>
                    <div>{convertDate(task.due_date)}</div>
                </div>

            </div>


            <div className="formFooter">

                <button onClick={handleComplete} className="simpleButton" >
                        {task?.completed?   "Mark Uncompleted" : "Mark Complete"}
                </button>

                <button onClick={(e)=>{setModalContent(<EditCreateTask task={task}/>)}}
                    className="simpleButton">
                        Edit
                </button>

                <button onClick={handleDelete} className="simpleButton" >
                        Delete
                </button>

            </div>



        </div>
    )
}

export default TaskDetails
