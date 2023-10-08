import { loadFreelancerBookings, createBooking, updateBooking  } from "../../store/bookings";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { useModal } from "../../context/Modal";
import "./booking.css"
import { fixDate } from "../../util";
import { getUserRelationships } from "../../store/relationships";



function EditCreateBooking({booking, edit=true, clientInfo}){
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const [day, setDay] = useState('')
    const [time, setTime] = useState('')
    const [duration, setDuration] = useState('')
    const [title, setTitle] = useState('')
    const [location, setLocation] = useState('')
    const [errors, setErrors] = useState([])
    const clientId = useRef(null)
    const typeForm = useRef(null)

    useEffect(()=>{
        dispatch(getUserRelationships())
    },[dispatch])

    useEffect(()=>{
        if(booking){
            typeForm.current = 'Edit'
            clientId.current = booking.clientId
            // formatt the date so that it can be imported. without these steps date WILL NOT IMPORT
            const inputDateString = booking.day
            const inputDate = new Date(inputDateString);
            const formattedDate = inputDate.toISOString().split('T')[0];
            setDay(formattedDate)
            setTime(booking.time)
            setDuration(String(booking.duration))

            setTitle(booking.title)
            if(booking.location){
                setLocation(booking.location)
            }
        } else{
            typeForm.current = 'Create'
            clientId.current = clientInfo.id
        }
    }, [booking, clientInfo])

    const client = useSelector((state)=> state.relationships.Clients[clientId])
    const user = useSelector((state)=> state.session.user)



    async function handleSubmit(e){
        e.preventDefault();
        const err = [];
        const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        const today = new Date()
        let inputDate = fixDate(day)



        if (!title) err.push("Title is required")
        if(title && (title.length < 2 || title.length > 35)) err.push("Title must be between 2 and 35 characters")
        if(!day) err.push('Date is required')
        if(day && (inputDate.setHours(0,0,0,0) < today.setHours(0,0,0,0)))err.push('Date must be in the future')
        if(!time) err.push('Start time is required')
        if(!duration){err.push("Duration is required")}
        if(duration && !regex.test(duration)){
            err.push("Duration must be in a valid format (HH:MM)")
        }
        if(!location) err.push ('Location is required. ')
        if(err.length){
            setErrors(err)
            return;
        }
        const payload = {
            day,
            time,
            duration,
            title,
            location,
        };
        let response = null
        if(booking && booking.id){
            response = await dispatch(updateBooking( booking.id, payload))
        }else{
            response = await dispatch(createBooking(clientId.current ,payload))
        }
        if(response && response.length){
            setErrors(response)
        }else{
            dispatch(loadFreelancerBookings(user.id))
            closeModal()
            alert('Appointments Updated Successfully!')
        }
    }


    return (
        <div className="editCreateCont">

            <div className="formHeading">
                <div className="componentTitle orange">
                    {typeForm.current? 'Edit' : 'Create'} an Appointment
                </div>
                <div className="formClient">
                    {client? `${client.firstName} ${client.lastName}`: ""}
                </div>
            </div>

            <div className="formBody">
                <div className="errors">
                    {errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
                </div>

                {/* title */}
                <label>Title</label>
                <input
                    className="formStringInput"
                    placeholder="Title ..."
                    type="text"
                    value={title}
                    onChange={(e)=>{setTitle(e.target.value)}}
                />
                {errors.title}

                {/* day */}
                <label>Date</label>
                <input
                    name="day"
                    type='date'
                    value={day}
                    onChange={(e)=>{setDay(e.target.value)}}
                />
                {errors.day}

                {/* time */}
                <label>Start Time</label>
                <input
                    type="time"
                    id="appt"
                    name="appt"
                    value={time}
                    onChange={(e)=>{setTime(e.target.value)}}
                />
                {errors.title}

                {/* duration */}
                <label>Duration (HH:MM)</label>
                <input
                    type="text"
                    id="timeInput"
                    value={duration}
                    onChange={(e)=>{setDuration(e.target.value)}}
                    placeholder="HH:MM"
                />
                {errors.duration}

                {/* location */}
                <label>Location</label>
                <input
                    className="formStringInput"
                    placeholder="Location ..."
                    type="text"
                    value={location}
                    onChange={(e)=>{setLocation(e.target.value)}}
                />
                {errors.location}
            </div>

            <div className="formFooter">
                <button onClick={(e)=> handleSubmit(e)}>
                    Save
                </button>

                <button onClick={()=>{closeModal()}}>
                    Cancel
                </button>

            </div>

        </div>
    )
}

export default EditCreateBooking
