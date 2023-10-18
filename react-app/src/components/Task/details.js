import EditCreateTask from "./create_edit"
import { useModal } from "../../context/Modal"
import { useDispatch } from "react-redux";
import { removeTask , loadAllTask, completeTask} from "../../store/task";
import { convertDate, convertPhone, convertTime } from "../../util";



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
        <div className="editCreateCont">
            <div className="formHeading">
                <div className="componentTitle orange">{task?.description}</div>

            </div>
            <div className="formBody">

                <div> Before {convertDate(task.due_date)}</div>

                {task.Client ?    <>            <div className="componentTitle orange">Client</div>
                <div >{task?.Client?.firstName} {task?.Client?.lastName}</div>
                <div>{convertPhone(task.Client?.phoneNumber)}</div>
                <div>{task.Client?.email}</div></>  : <></> }



                <div className="componentTitle orange"> Priority: </div>
                <div>{task?.priority}</div>


                <div className="componentTitle orange"> Status: </div>
                <div> {task?.completed? "Completed": "Not completed"}</div>

                <div className="componentTitle orange"> Created at: </div>
                <div> {task?.createdAt?.slice(0,16)}</div>
            </div>
            <div className="formFooter">
                <button onClick={(e)=>{setModalContent(<EditCreateTask task={task}/>)}}
                className="simpleButton">
                    Edit
                </button>

                <button onClick={handleDelete} className="simpleButton" >
                    Delete
                </button>

                <button onClick={handleComplete} className="simpleButton" >
                    {task?.completed?   "Mark Uncompleted" : "Mark Complete"}
                </button>




            </div>



        </div>
    )
}

export default TaskDetails
