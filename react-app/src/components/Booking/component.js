import { loadFreelancerBookings } from "../../store/bookings";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import './booking.css'




function BookingSlice ({clientId}){
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)

    useEffect(() => {
      dispatch(loadFreelancerBookings(user.id));
    }, [dispatch, user.id]);


    const bookingsAll = useSelector((state) => state.bookings.all);
    console.log(bookingsAll)
    const bookingsIds = useSelector((state)=> state.bookings.byClient[clientId])
    console.log(bookingsIds)
    const clientBookings = []

    if (bookingsAll && bookingsIds) {
        
        bookingsIds.forEach((id) => {
            if (bookingsAll[id]) {
                clientBookings.push(bookingsAll[id]);
            }
        });
    }
    return <>
        <div className="componentTitle">
            Upcoming Appointments
        </div>
        {clientBookings.length?
            <div>
                { clientBookings.map((b)=>{return (
                    <div className="bookingOverview">{b.day ? <>
                      <span className="overviewTitle">{ b.day.slice(5,11)} {b.time}</span>  {b.title} </>: <></>}
                    </div>)
                })}
            </div>
        : <></>}
    </>
}
export default BookingSlice
