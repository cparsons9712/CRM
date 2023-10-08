import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { removeBooking, loadFreelancerBookings } from "../../store/bookings";
import { useSelector } from "react-redux";
import EditCreateBooking from "./createEdit";
import { convertDate, convertTime, convertPhone } from "../../util";
import { useEffect } from "react";
import { getUserRelationships } from "../../store/relationships";


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
    <div className="editCreateCont">
        <div className="formHeading">
            <div className="componentTitle orange">{booking.title}</div>

        </div>
        <div className="formBody">
            <div>{convertDate(booking.day)} {convertTime(booking.time)}</div>
            <div className="componentTitle orange">Client:</div>
            <div className="formClient">{booking.Client.firstName} {booking.Client.lastName}</div>
            <div >{convertPhone(booking.Client.phoneNumber)} </div>
            <div> {booking.Client.email} </div>
            <div className="componentTitle orange">Location:</div>
            <div>{booking.location}</div>
        </div>
            <div>
                <button onClick={handleEdit} className="simpleButton">Edit</button>
                <button onClick={handleDelete} className="simpleButton">Delete</button>
            </div>
    </div>)
}
export default SeeBookingDetails
