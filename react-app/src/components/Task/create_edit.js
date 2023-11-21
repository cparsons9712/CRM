import { loadAllTask, createTask, updateTask, removeTask } from "../../store/task";
import { getUserRelationships } from "../../store/relationships";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { useModal } from "../../context/Modal";
import "./task.css"


function EditCreateTask({task, edit=true, clientInfo }){
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [priority, setPriority] = useState('Med')
    const [due_date, setDueDate] = useState('')
    const [clientId, setClientId] = useState('')

    const typeForm = useRef(null)


    const [errors, setErrors] = useState([])


    useEffect(() => {
        dispatch(getUserRelationships())
      }, [dispatch]);

    useEffect(() => {
        if (task) {
            typeForm.current = "Edit"
            if (task.Client){
                setClientId(task.Client.id)
                //console.log(`$$$$ task.Client`)
            }
            setTitle(task.title)
            if(task.description) {
                setDescription(task.description)
            }
            setPriority(task.priority)
            if (task.due_date) {
                const inputDateString = task.due_date
                const inputDate = new Date(inputDateString);
                const formattedDate = inputDate.toISOString().split('T')[0];
                setDueDate(formattedDate)
            }
        } else {
            typeForm.current = "Create"
            if(clientInfo){
                setClientId(clientInfo.id)
            }

        }
    }, [task, clientInfo, clientId]);

    const clients = useSelector((state)=> state.relationships.Clients)
    //console.log('%%%%%', clients)


    async function handleSubmit(e) {
        setErrors([])
        e.preventDefault();

        const payload = {
          description,
          priority,
          due_date,
          title
        };
        if(clientId){
            payload.clientId = clientId
        }
        let response;

        if (task && task.id) {
           response = await dispatch(updateTask(task.id, payload));
        } else {
            response = await dispatch(createTask(payload));
        }
        if(response && response.length){
            setErrors(response)
        }else {
            dispatch(loadAllTask());
            closeModal();
        }
    }


    return (
    <div className="editCreateCont">

        <div className="formHeading">
            <div className="componentTitle orange"> {task? 'Edit' : 'Create'} a Task</div>
            {/* <div className="formClient">{client?  `${client.firstName} ${client.lastName}`: ""} </div> */}

        </div>

        <div className="formBody">
            <div className="errors">
         {errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
            </div>



                <label>Client: </label>
                <select
                    name="client"
                    id="selectedClient"
                    value={clientId || ''}
                    onChange={e => setClientId(e.target.value)}
                >
                     <option key={0} value={""}></option>
                    {clients? Object.values(clients).map((client) => (
                        <option key={client.id} value={client.id}>
                        {client.firstName} {client.lastName}
                        </option>
                    )) : ""}
                </select>

            <label>Title:</label>
            <input
                className="formInput"
                placeholder= "Write a title here ..."
                type="text"
                value={title}
                onChange={(e)=> setTitle(e.target.value)}
            />
            {errors.title}

            <label>Description:</label>
            <textarea
            className="formTextArea"
                placeholder= "Add additional details ..."
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
                className="dateInput"
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
