// Task page
import { loadFreelancerBookings } from "../../store/bookings";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";





function BookingPage (){
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(loadFreelancerBookings(user.id));
    }, [dispatch]);

    const user = useSelector(state => state.session.user)
    const bookings = useSelector((state) => state.bookings.all);




    return (
        <>
        <div className="componentTitle">BOOKINGS COMING SOON</div>
        {bookings? ()}



        </>
    )
}
export default BookingPage
