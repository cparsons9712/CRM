import TaskComponent from "../Task/TaskComponent"
import './dashboard.css'
import { loadAllTask } from "../../store/task"
import { getUserRelationships } from "../../store/relationships"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCaretDown} from '@fortawesome/free-solid-svg-icons';
import { fixDate } from "../../util";
import BookingPage from "../Booking/mainpage";
import BookingSlice from "../Booking/component";

function Dashboard (){
    const dispatch = useDispatch();

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
            if(today.setHours(0,0,0,0) === due_date.setHours(0,0,0,0)) taskDueCount ++
        }
        return taskDueCount
    }
    const getBookingsDue = () =>{
        let today = new Date()
        let appointments = 0
        for (let appt of bookingArr){
            let due_date = fixDate(appt.day)
            if(today.setHours(0,0,0,0) === due_date.setHours(0,0,0,0)) appointments ++
        }
        return appointments
    }



    return (
        <div className="dashboard">
            <div className="dashboardHeader">
                <div className="clientInfo">
                    <div className="clientName">Hey There {user.firstName}</div>
                    <div className="clientContact"> Today you have: </div>
                    <div className="clientContact"> {getTaskDue()} task due</div>
                    <div className="clientContact"> {getBookingsDue()} appointments</div>
                </div>

                <div className="upcomingAppt">
                    <BookingSlice />
                </div>
            </div>

            <div className="componentSlice">
                    <div className="componentTitle">Task</div>
                    {task?< TaskComponent task={taskArray}/>: <div className="empty">LOADING</div> }
            </div>

            {/* <div className="componentTitle">Messages</div> */}

        </div>
    )
}
export default Dashboard
