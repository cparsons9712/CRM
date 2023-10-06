import { loadFreelancerBookings } from "../../store/bookings";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import './booking.css'
import SeeBookingDetails from "./details";
import { useModal } from "../../context/Modal";
import { fixDate } from "../../util";



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
            if(bookingsIds && bookingsIds.length){
                bookingsIds.forEach((id) => {
                    if (bookingsAll.all[id]) {
                        bookings.push(bookingsAll.all[id]);
                    }
                });
            }
        }else{
            Object.values(bookingsAll.all).forEach((b) => {
                bookings.push(b)
            })
        }
    }


    const parseTime= (time) =>{
        const [hours, minutes] = time.split(':');
        return new Date(0, 0, 0, hours, minutes);
    }
    bookings.sort(function(a, b) {
        const dateA = fixDate(a.day);
        const dateB = fixDate(b.day);
        const timeA = parseTime(a.time);
        const timeB = parseTime(b.time);


        if (dateA < dateB) {
          return -1;
        } else if (dateA > dateB) {
          return 1;
        } else {
          return timeA - timeB;
        }
      });



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
