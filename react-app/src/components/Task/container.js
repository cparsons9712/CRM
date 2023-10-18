import { useState, useEffect } from "react"
import TaskComponent from "./TaskComponent"

function TaskContainer({task, type='task'}){

    const [taskSet, setTaskSet] = useState('due')
    const [taskArray, setTaskArray] = useState([])



    useEffect(()=>{
        let arr = []
        if(taskSet === 'due'){
           Object.values(task).forEach(t => {
                if(t.completed === false){
                    arr.push(t)
                }
           })
        }
        if(taskSet === 'complete'){
            Object.values(task).forEach(t => {
                if(t.completed === true){
                    arr.push(t)
                }
           })
        }
        if(taskSet === 'all'){
            Object.values(task).forEach(t => {
                arr.push(t)
            })
        }
        setTaskArray(arr)
    }, [taskSet, task])



    return(
    <div className="componentSlice">

        <div className="componentTitle">
            {type}
        </div>

        <div className="optionsBar">
            <div className="optionsLeft">

                <input
                    type="radio"
                    value="due"
                    id={`due${type}`}
                    name={type}
                    checked={taskSet === 'due'}
                    onChange={(e) =>{ setTaskSet(e.target.value)}}
                />
                <label htmlFor={`due${type}`}>
                    Due
                </label>


                <input
                    type="radio"
                    value="complete"
                    id={`complete${type}`}
                    name={type}
                    checked={taskSet === 'complete'}
                    onChange={(e) =>{ setTaskSet(e.target.value)}}
                />
                <label htmlFor={`complete${type}`}>
                    Completed
                </label>


                <input
                    type="radio"
                    value="all"
                    id={`all${type}`}
                    name={type}
                    checked={taskSet === 'all'}
                    onChange={(e) =>{ setTaskSet(e.target.value)}}
                />
                <label htmlFor={`all${type}`}>
                    All
                </label>
            </div>

            <div className="optionsRight">


            </div>

        </div>
        {task?< TaskComponent task={taskArray}/>: <div className="empty">LOADING</div> }
    </div>)
}

export default TaskContainer
