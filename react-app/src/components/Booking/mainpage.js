// Task page
import { loadFreelancerBookings } from "../../store/bookings";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import './booking.css'




function BookingPage (){
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)

    useEffect(() => {
      dispatch(loadFreelancerBookings(user.id));
    }, [dispatch, user.id]);


    const bookings = useSelector((state) => state.bookings.all);

    return (
    <div className="bookingPage">

        <div className="bookingHeader">
            <div className="componentTitle">
            Upcoming Appointments:
            </div>
            <button>
                +
            </button>
        </div>

        <div className="bookingCont">

            {bookings ? ( Object.values(bookings).map((booking)=>{return(
            <div key={`booking${booking.id}`} className="bookingTile">
                <div className="bookingWhen">{booking.day? booking.day.slice(5,11): 'when'}  {booking.time} </div>
                <div>{booking.title}</div>
                <div>Who: {booking.Client.firstName} {booking.Client.lastName}</div>
                <div>{booking.location? <>Where: {booking.location}</>: <>no place specified</>}</div>
            </div>
            )
            })): <div> Loading</div>}
        </div>




    </div>
    )
}
export default BookingPage
