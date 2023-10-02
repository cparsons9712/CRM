import { loadAllTask, createTask, updateTask, removeTask } from "../../store/task";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { useModal } from "../../context/Modal";
import "./task.css"


function EditCreateTask({task, edit=true, clientInfo }){
    const { closeModal } = useModal();
    const dispatch = useDispatch();


    const [description, setDescription] = useState('')
    const [priority, setPriority] = useState('Med')
    const [due_date, setDueDate] = useState('')
    const clientId = useRef(null)
    const typeForm = useRef(null)


    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (task) {
            typeForm.current = "Edit"
            clientId.current = task.Client.id;

            setDescription(task.description)
            setPriority(task.priority)
            if (task.due_date) {
                const inputDateString = task.due_date
                const inputDate = new Date(inputDateString);
                const formattedDate = inputDate.toISOString().split('T')[0];
                setDueDate(formattedDate)
            }
        } else {
            typeForm.current = "Create"
            clientId.current = clientInfo.id
        }
    }, [task, clientInfo]);

    const client = useSelector((state)=> state.relationships.Clients[clientId])



    async function handleSubmit(e) {

        e.preventDefault();
        const err = {};
        if (!description.length) {
          err.text = 'Text cannot be empty';
        }
        else if (priority !== 'High' && priority !== 'Med' && priority !== 'Low'){
            err.priority = 'Priority must be "High", "Med" or "Low'
        }
        else if (!due_date){
            err.due_date = "NOT A VALID DUE DATE"
        }

        if (Object.values(err).length){
            setErrors(err)
            console.log('FRONTEND VALIDATION ERRORS ----- EXITING')
            return;
        }

        const payload = {
          clientId : clientId.current,
          description,
          priority,
          due_date
        };


        if (task && task.id) {
          dispatch(updateTask(task.id, payload));
        } else {
            const response = await dispatch(createTask(payload));
            if (response && !response.errors) {
                dispatch(loadAllTask());
            }
        }

        closeModal();
      }


    return (
    <div className="editCreateCont">

        <div className="formHeading">
            <div className="componentTitle"> {typeForm.current? 'Edit' : 'Create'} a Task</div>
            <div className="formClient">{client?  `${client.firstName} ${client.lastName}`: ""} </div>
        </div>

        <div className="formBody">
            <label>Description:</label>
            <textarea
            className="formTextArea"
                placeholder= "Write a task here ..."
                type="text"
                value={description}
                onChange={(e)=> setDescription(e.target.value)}
            />
            {errors.description}

            <label htmlFor="selectedPriority"> Priority:</label>
            <select
                name="priority"
                id="selectedPriority"
                value={priority}
                onChange={e => setPriority(e.target.value)}
            >
                    <option value="High">High</option>
                    <option value="Med">Medium</option>
                    <option value="Low">Low</option>
            </select>
            {errors.priority}

            <label>Due Date:</label>
            <input
                name="dueDate"
                type="date"
                value={due_date}
                onChange={(e) => {
                    setDueDate(e.target.value)
                }}

            />
            {errors.due_date}


    </div>

    <div className="formFooter">
        <button onClick={(e) => handleSubmit(e)}>
            Save
        </button>

        <button onClick={() => { closeModal(); }} >
            Cancel
        </button>


    </div>


    </div>
    )
}
export default EditCreateTask
