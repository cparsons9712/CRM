import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { removeBooking, loadFreelancerBookings } from "../../store/bookings";
import { useSelector } from "react-redux";
import EditCreateBooking from "./createEdit";

function SeeBookingDetails({booking}){
    const dispatch = useDispatch();
    const { setModalContent, closeModal } = useModal();

    const user = useSelector((state) => state.session.user)

    const handleDelete =() =>{
        if(window.confirm('Are you sure you want to delete this appointment?')) {
            dispatch(removeBooking(booking.id));
            dispatch(loadFreelancerBookings(user.id));
        }
        closeModal()
    }

    const handleEdit = () =>{
        setModalContent(<EditCreateBooking booking = {booking}/>)
    }


    return(
    <div className="editCreateCont">
        <div className="formHeading">
            <div className="componentTitle orange">{booking.title}</div>

        </div>
        <div className="formBody">
            <div>{booking.day} {booking.time}</div>
            <div className="componentTitle orange">Client:</div>
            <div className="formClient">{booking.Client.firstName} {booking.Client.lastName}</div>
            <div >{booking.Client.phoneNumber} </div>
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
