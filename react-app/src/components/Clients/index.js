// client page

import { useEffect , useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import "./clients.css"
import { useModal } from "../../context/Modal";
import TaskComponent from "../Task/TaskComponent";
import NotesComponent from "./notes";
import EditCreateNote from "./edit_new";
import { loadAllTask } from "../../store/task"
import { getUserRelationships } from "../../store/relationships"
import { loadClientNotes } from "../../store/notes";

function ClientPage (){

    const [selectedClient, setClient] = useState("")
    const [clientInfo, setClientInfo] = useState()
    const[clientTask, setClientTask] = useState(null)
    const [clientNotes, setClientNotes] = useState(null)

    const Alltask = useSelector((state) => state.task);
    const clients = useSelector((state)=> state.relationships.Clients)
    const allNotes = useSelector((state)=> state.notes)

    const dispatch = useDispatch()
    const {modalContent, setModalContent} = useModal()

    useEffect(()=>{
        dispatch(getUserRelationships())
        dispatch(loadAllTask())
        dispatch(loadClientNotes())
    }, [dispatch])


    useEffect(()=>{
        clients && setClientInfo(clients[selectedClient])

    }, [selectedClient, clients])

    useEffect(()=>{
        let task = [];
        if(Alltask.byClient[selectedClient]){
            Alltask.byClient[selectedClient].map((id)=>{
                return task.push(Alltask.all[id])
        })
        }
        setClientTask(task)
        setClientNotes(null)
        let notes = [];
        if(allNotes.byClient[selectedClient]){
            allNotes.byClient[selectedClient].map((id)=>{
                return notes.push(allNotes.all[id])
        })
        setClientNotes(notes)
        }

    }, [selectedClient, Alltask, allNotes])




    return (
        <div className="clientPageCont">
            <div className="clientNav">
                {clients?(  Object.values(clients).map((client)=>{
                    return(
                        <div className="clientOption" key={client.id}>
                            <input
                            id={client.id}
                            type='radio'
                            name='client'
                            value={client.id}

                            onChange={(e)=>{
                                setClient(e.target.value)
                            }}

                            />
                            <label htmlFor={client.id}>{client.firstName} {client.lastName}</label>
                        </div>

                    )
                })): <div> Loading </div>}


            </div>
            <div className="clientInfo">

                {/* Display client information based on the selectedClient */}
                {clientInfo ? (
                <>
                    <div className="clientName">
                        {clientInfo.firstName} {clientInfo.lastName}
                    </div>

                    <div className="clientContact">
                        {`(${clientInfo.phoneNumber.slice(0,3)}) ${clientInfo.phoneNumber.slice(3,6)} - ${clientInfo.phoneNumber.slice(6)}`}
                    </div>

                    <div className="clientContact">
                        {clientInfo.email}
                    </div>
                    <div className="clientButtons">
                        <button>Schedule</button>
                        <button>Message</button>
                        <button
                            onClick={() =>
                                setModalContent(<EditCreateNote clientInfo={clientInfo} />)}>
                            Note
                        </button>
                        <button>Task</button>
                    </div>
                </>
                ) : (
                <h2>Select a client to view details.</h2>
                )}
            </div>
            <div className="upcomingAppt">
                    Upcoming Appt coming soon
            </div>
            <div className="notes">
            {clientNotes && clientNotes.length ? (
                <>
                    <div className="componentTitle">Notes</div>
                    <NotesComponent notes={clientNotes}/>
                </>
                ) : (
                    <>
                        <div className="componentTitle">Notes</div>
                        <p>None</p>
                    </>
                )}
            </div>
            <div className="task">

            {clientTask && clientTask.length ? (
                <>
                <div className="componentTitle">Task</div>
                <TaskComponent task={clientTask} />
                </>
                ) : (<>
                    <div className="componentTitle">Task</div>
                    <p>None</p>
                    </>
            )}


            </div>
            <div className="messages">
                Messages coming soon

            </div>
        </div>
    )
}
export default ClientPage
