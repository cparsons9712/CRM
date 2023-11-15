import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { removeBooking, loadFreelancerBookings } from "../../store/bookings";
import { useSelector } from "react-redux";
import EditCreateBooking from "./createEdit";
import { convertDate, convertTime, convertPhone } from "../../util";
import { useEffect } from "react";
import { getUserRelationships } from "../../store/relationships";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileSignature, faImagePortrait, faTriangleExclamation, faListCheck, faCalendarDays, faLocationDot } from "@fortawesome/free-solid-svg-icons";


function SeeBookingDetails({booking}){
    const dispatch = useDispatch();
    const { setModalContent, closeModal } = useModal();
    useEffect(()=>{
        dispatch(getUserRelationships())
    },[dispatch])

    const user = useSelector((state) => state.session.user)

    const handleDelete = async() =>{
        if(window.confirm('Are you sure you want to delete this appointment?')) {
            await dispatch(removeBooking(booking.id));
            await dispatch(loadFreelancerBookings(user.id));
        }
        closeModal()
    }

    const handleEdit = () =>{
        setModalContent(<EditCreateBooking booking = {booking} clientInfo={booking.Client}/>)
    }


    return(
    <div className="taskDetailsCont BookingsDet">
        <div className="taskHeading">

            <div className="componentTitle dark">{booking.title}</div>

        </div>
        <div className="detailsContent bookingContentDet">

            <div className="taskSection bookingSect">
                <FontAwesomeIcon icon={faCalendarDays} className="icon"/>
                    <div>{convertDate(booking.day)} <br></br>{convertTime(booking.time)}</div>
            </div>

            <div className="taskSection bookingSect">
                <FontAwesomeIcon icon={faImagePortrait} className="icon" />
                <br></br>
                {booking.Client.firstName} {booking.Client.lastName}
                <br></br>
                {convertPhone(booking.Client.phoneNumber)}
                <br></br>
                {booking.Client.email}
            </div>

            <div className="taskSection bookingSect">
                <FontAwesomeIcon icon={faLocationDot} className="icon" />
                <br></br>
                {booking.location}

            </div>
        </div>
            <div className="bookingDetailsFooter">
                <button onClick={handleEdit} className="simpleButton">Edit</button>
                <button onClick={handleDelete} className="simpleButton">Delete</button>
            </div>
    </div>)
}
export default SeeBookingDetails
