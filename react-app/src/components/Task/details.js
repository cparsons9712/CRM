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
                <div className="componentTitle orange">{task?.description}</div>

            </div>
            <div className="formBody">

                <div> Before {task?.due_date?.slice(0,16)}</div>
                <div className="componentTitle orange">Client</div>
                <div >{task?.Client.firstName} {task?.Client.lastName}</div>
                <div>{task?.Client.phoneNumber}</div>
                <div>{task.Client.email}</div>



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


            </div>



        </div>
    )
}

export default TaskDetails
