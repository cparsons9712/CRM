// Task page
import { loadAllTask } from "../../store/task"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import TaskComponent from "../Task/TaskComponent"
import TaskContainer from "./container";
import './task.css'


function TaskPage (){
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(loadAllTask());
    }, [dispatch]);

    const task = useSelector((state) => state.task.all);

    const highTask = []
    const medTask = []
    const lowTask = []

    Object.values(task).forEach((t) => {
        if (t.priority === "High") {
            highTask.push(t);
        } else if (t.priority === "Med") {
            medTask.push(t);
        } else {
            lowTask.push(t);
        }
    });

    return (
        <>

        <TaskContainer task={highTask} type={'High'} />

        <TaskContainer task={medTask} type={'Medium'}/>

        <TaskContainer task={lowTask} type={'Low'}/>


        </>
    )
}
export default TaskPage
