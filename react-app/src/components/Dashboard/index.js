import './dashboard.css'
import { loadAllTask } from "../../store/task"
import { getUserRelationships } from "../../store/relationships"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fixDate } from "../../util";
import BookingSlice from "../Booking/component";
import TaskContainer from "../Task/container";
import EditCreateTask from '../Task/create_edit';
import { useModal } from '../../context/Modal';


function Dashboard (){
    const dispatch = useDispatch();
    const { setModalContent} = useModal();

    useEffect(() => {
      dispatch(loadAllTask());
      dispatch(getUserRelationships())
    }, [dispatch]);

    const task = useSelector((state) => state.task.all);
    const bookings = useSelector(state => state.bookings.all)
    const user = useSelector((state)=> state.session.user)

    const taskArray = task ? Object.values(task) : [];
    const bookingArr = bookings ? Object.values(bookings) : [];

    const getTaskDue = () =>{
        let today = new Date()
        let taskDueCount = 0
        for (let task of taskArray){
            let due_date = fixDate(task.due_date)
            if((today.setHours(0,0,0,0) >= due_date.setHours(0,0,0,0)) && !task.completed) taskDueCount ++
        }
        if (taskDueCount === 1){
            return "1 task due"
        }
        return  `${taskDueCount} tasks due`
    }




    const getBookingsDue = () =>{
        let today = new Date()
        let appointments = 0
        for (let appt of bookingArr){
            let due_date = fixDate(appt.day)
            if(today.setHours(0,0,0,0) === due_date.setHours(0,0,0,0)) appointments ++
        }

        if (appointments ===1){
            return <>1 appointment</>
        }
        return <>{appointments} appointments</>
    }



    return (
        <div className="dashboard">
            <div className="dashboardHeader">
                <div className="clientInfo">
                    <div className="clientName">Hey There {user.firstName}</div>
                    <div className="clientContact"> Today you have: </div>
                    <div className="clientContact"> {getTaskDue()}</div>
                    <div className="clientContact"> {getBookingsDue()}</div>

                    <div className='clientButtons'>
                        <button onClick={(e)=>{setModalContent(<EditCreateTask />)}}>Add Task</button>
                        <button>Add Appointment</button>
                        <button>Add Client</button>
                    </div>
                </div>

                <div className="upcomingAppt">
                    <BookingSlice />
                </div>
            </div>


            {task?< TaskContainer task={task}/>: <div className="empty">LOADING</div> }


            {/* <div className="componentTitle">Messages</div> */}

        </div>
    )
}
export default Dashboard
