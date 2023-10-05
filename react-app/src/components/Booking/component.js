import { loadFreelancerBookings } from "../../store/bookings";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import './booking.css'
import SeeBookingDetails from "./details";
import { useModal } from "../../context/Modal";



function BookingSlice ({clientId}){
    const dispatch = useDispatch();
    const { setModalContent } = useModal();
    const user = useSelector(state => state.session.user)

    useEffect(() => {
      dispatch(loadFreelancerBookings(user.id));
    }, [dispatch, user.id]);

    const bookingsAll = useSelector((state) => state.bookings);

    let bookings = []

    if (bookingsAll) {
         if (clientId){
            let bookingsIds = bookingsAll.byClient[clientId]
            bookingsIds.forEach((id) => {
            if (bookingsAll.all[id]) {
                bookings.push(bookingsAll.all[id]);
            }
        });
        }else{
            Object.values(bookingsAll.all).forEach((b) => {
                bookings.push(b)
            })
        }
    }








    const handleBookingClick = (b) =>{
        setModalContent(<SeeBookingDetails booking={b} />)
    }
    return <>
        <div className="componentTitle">
            Upcoming Appointments
        </div>
        {bookings.length?
            <div>
                { bookings.map((b)=>{return (
                    <div className="bookingOverview" onClick={()=>{handleBookingClick(b)}}>{b.day ? <>
                      <span className="overviewTitle">{ b.day.slice(5,11)} {b.time}</span>  {b.title} </>: <></>}
                    </div>)
                })}
            </div>
        : <></>}
    </>
}
export default BookingSlice
