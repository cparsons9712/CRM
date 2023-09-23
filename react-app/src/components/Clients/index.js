// client page
import { getUserRelationships } from "../../store/relationships"
import { useEffect , useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import "./clients.css"
import TaskComponent from "../Task/TaskComponent";
import { loadAllTask } from "../../store/task"

function ClientPage (){
    const [selectedClient, setClient] = useState("")
    const [clientInfo, setClientInfo] = useState()
    const[clientTask, setClientTask] = useState(null)
    const Alltask = useSelector((state) => state.task);
    const clients = useSelector((state)=> state.relationships.Clients)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getUserRelationships())
        dispatch(loadAllTask())
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
    }, [selectedClient, Alltask])






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

                            onChange={(e)=>{setClient(e.target.value)}}

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
                        <button>Note</button>
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
                    Notes coming Soon
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
