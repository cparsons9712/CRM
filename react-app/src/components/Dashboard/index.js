import TaskComponent from "../Task/TaskComponent"
import './dashboard.css'
import { loadAllTask } from "../../store/task"
import { getUserRelationships } from "../../store/relationships"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Dashboard (){
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(loadAllTask());
      dispatch(getUserRelationships())
    }, [dispatch]);

    const task = useSelector((state) => state.task.all);



    return (
        <>
        <div className="componentTitle">Task</div>
            < TaskComponent task={task}/>

        <div className="componentTitle">Appointments</div>


        <div className="componentTitle">Messages</div>




        </>
    )
}
export default Dashboard
