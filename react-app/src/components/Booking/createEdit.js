import { loadFreelancerBookings, createBooking, updateBooking  } from "../../store/bookings";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { useModal } from "../../context/Modal";
import "./booking.css"



function EditCreateBooking({booking, edit=true, clientInfo}){
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const [day, setDay] = useState('')
    const [time, setTime] = useState('')
    const [duration, setDuration] = useState('')
    const [title, setTitle] = useState('')
    const [location, setLocation] = useState('')
    const [errors, setErrors] = useState({})
    const clientId = useRef(null)
    const typeForm = useRef(null)

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
        const err = {};
        if (!title.length) err.title = 'Title is required'
        if(!day) err.day = 'Day is required'
        if(!time)err.time = 'Time is required'
        if(!duration) err.duration = 'Duration is required'
        const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if(!regex.test(time)){
            err.duration = "Time must be in a valid formatt"
        }


        if(Object.values(err).length){
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
        if(response && !response.errors){
            dispatch(loadFreelancerBookings(user.id))
            closeModal()
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
