import {
    Calendar as BigCalendar,
    CalendarProps,
    momentLocalizer,
} from "react-big-calendar"
import moment from "moment";
import { loadFreelancerBookings } from "../../store/bookings";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import './booking.css'
import { convertDateTime } from "../../util";
import './calender.css'


export default function Calender(){
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    // localizer tells the calender what day/time package we are working with. Here we are trying out moment
    const localizer = momentLocalizer(moment);

    useEffect(() => {
      dispatch(loadFreelancerBookings(user.id));
    }, [dispatch, user.id]);

    // We are getting all the bookings then formatting new objects to fit into how React Big Calender expects them. ConvertDateTime takes in a date object that has a dummy time attached to it and a time and combines them into a single datetime object
    let events = []
    const bookings = useSelector((state) => state.bookings.all);
    Object.values(bookings).forEach((appointment)=>{

        const startStr = convertDateTime(appointment.day, appointment.time)
        const endStr = convertDateTime(appointment.day, appointment.endTime)
        let start = moment(startStr).toDate()
        let end = moment(endStr).toDate()

        events.push({
            start,
            end,
            title: appointment.title,
            id: appointment.id,
            location: appointment.location,
        })

    })


    /*
        React Big Calendar Information:
        1) Make sure bigCalendar is wrapped in a div with a height to that it appears
        2) pass in appointments in an events prop
        3) view prop sets what the calender allows as a view (singular). It hard codes it so you wont be able to change the view time period if you use it.For multiple view options use views. it takes in an array of view periods that will be allowed.
        4) defaultView sets the view that the calender originates at. Will allow user to change the view period.
        5) min / max will set the starting time on the day/week view and ending time on day/week view instead of having an entire 24 hr period ex: min={moment("2023-10-20T06:00:00").toDate()} ******* consider tying this to schedule so the user can set the time periods they see in the calender ******




    */
    return <div style={{height: "85vh"}}>
        <BigCalendar  localizer={localizer} events={events} defaultView={"month"} />
    </div>
}
