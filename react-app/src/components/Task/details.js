import EditCreateTask from "./create_edit"
import { useModal } from "../../context/Modal"
import { useDispatch } from "react-redux";
import { removeTask , loadAllTask} from "../../store/task";



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



    return(
        <div className="editCreateCont">
            <div className="formHeading">
                <div className="componentTitle">Task Details</div>
                <div className="formClient">{task?.Client.firstName} {task?.Client.lastName}</div>
            </div>
            <div className="formBody">
                <div className='formTextArea'>{task?.description}</div>
                <div>due date: {task?.due_date?.slice(0,16)}</div>
                <div> priority: {task?.priority}</div>

                <div> {task?.completed? "Completed": "Not completed"}</div>
                <div>Created at: {task?.createdAt?.slice(0,16)}</div>
            </div>
            <div className="formFooter">
                <button onClick={(e)=>{setModalContent(<EditCreateTask task={task}/>)}} >
                    Edit
                </button>

                <button onClick={handleDelete} >
                    Delete
                </button>


            </div>



        </div>
    )
}

export default TaskDetails
