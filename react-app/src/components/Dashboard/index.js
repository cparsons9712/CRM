import TaskComponent from "../Task/TaskComponent"
import './dashboard.css'
import { loadAllTask } from "../../store/task"
import { getUserRelationships } from "../../store/relationships"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCaretDown} from '@fortawesome/free-solid-svg-icons';

function Dashboard (){
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(loadAllTask());
      dispatch(getUserRelationships())
    }, [dispatch]);

    const task = useSelector((state) => state.task.all);
    const taskArray = task ? Object.values(task) : [];



    return (
        <>
        <div className="componentHeader">
                <div className="componentTitle">Task</div>
                <div className="componentMenu"><FontAwesomeIcon icon={faSquareCaretDown} /></div>
        </div>

            {task?< TaskComponent task={taskArray}/>: <div className="empty">LOADING</div> }


        <div className="componentTitle">Appointments</div>


        {/* <div className="componentTitle">Messages</div> */}




        </>
    )
}
export default Dashboard
