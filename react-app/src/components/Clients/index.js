// client page

import { useEffect , useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import "./clients.css"
import { useModal } from "../../context/Modal";

import TaskComponent from "../Task/TaskComponent";
import NotesComponent from "./notes";
import EditCreateNote from "./edit_new";
import EditCreateTask from "../Task/create_edit";
import BookingSlice from "../Booking/component";
import EditCreateBooking from "../Booking/createEdit";
import TaskContainer from "../Task/container";

import { loadAllTask } from "../../store/task"
import { getUserRelationships } from "../../store/relationships"
import { loadClientNotes } from "../../store/notes";
import { loadFreelancerBookings } from "../../store/bookings";
import AddClient from "./addClientUser";

import { convertPhone } from "../../util";

function ClientPage (){

    const [selectedClient, setClient] = useState("")
    const [clientInfo, setClientInfo] = useState()
    const[clientTask, setClientTask] = useState(null)
    const [clientNotes, setClientNotes] = useState(null)

    const Alltask = useSelector((state) => state.task);

    const clients = useSelector((state)=> state.relationships.Clients)
    const allNotes = useSelector((state)=> state.notes)
    const userId = useSelector((state)=>state.session.user.id)

    const dispatch = useDispatch()
    const {setModalContent} = useModal()

    useEffect(()=>{
        dispatch(getUserRelationships())
        dispatch(loadAllTask())
        dispatch(loadClientNotes())
        dispatch(loadFreelancerBookings(userId))
    }, [dispatch, userId])


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
        <div className="clientPageCont page">
            <div className="clientNav">
                <div className="componentTitle">Client List:</div>
                {clients?(  Object.values(clients).map((client)=>{
                    return(
                        <div className="clientOption" key={`client${client.id}`}>
                            <input
                            id={client.id}
                            type='radio'
                            name='client'
                            value={client.id}
                            className="clientRadioInput"
                            onChange={(e)=>{
                                setClient(e.target.value)
                            }}

                            />
                            <label htmlFor={client.id} className="clientRadioLabel">{client.firstName} {client.lastName}</label>
                        </div>

                    )
                })): <div> Loading </div>}


            </div>
            <div className="clientInfo">


                {clientInfo ? (
                <>
                    <div className="clientName">
                        {clientInfo.firstName} {clientInfo.lastName}
                    </div>

                    <div className="clientContact">
                        {convertPhone(clientInfo.phoneNumber)}

                    </div>

                    <div className="clientContact">
                        {clientInfo.email}
                    </div>
                    <div className="clientButtons">
                        <button onClick={()=>{setModalContent(<EditCreateBooking clientInfo={clientInfo}/>)}}>
                            Schedule
                        </button>


                        <button
                            onClick={() =>
                                setModalContent(<EditCreateNote clientInfo={clientInfo}/>)
                            }
                        >
                            Note
                        </button>


                        <button
                            onClick={() =>
                                setModalContent(<EditCreateTask clientInfo={clientInfo}/>
                            )}
                        > Task</button>
                    </div>
                </>
                ) : (
                <>
                    <h2>Select a client to view details.</h2>
                    <button
                        onClick={()=>{
                            setModalContent(<AddClient/>)
                        }}
                    >
                        Add New Client
                        </button>
                </>
                )}
            </div>
            <div className="upcomingAppt">
                    {selectedClient ? < BookingSlice clientId={selectedClient}/> : <></> }
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
                       <div className="sliceCont"></div>
                    </>
                )}
            </div>
            <div className="task">

            {clientTask  ? (
                <>

                <TaskContainer task={clientTask} />
                </>
                ) : (<>

                    <div className="sliceCont"> Loading</div>
                    </>
            )}


            </div>
            {/* <div className="messages">
                <div className="componentTitle">Messages</div>
                <div className="sliceCont"></div>

            </div> */}
        </div>
    )
}
export default ClientPage
