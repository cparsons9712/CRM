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
            setDay(booking.day)
            setTime(booking.time)
            setDuration(booking.duration)
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
                <div className="componentTitle">
                    {typeForm.current} an Appointment
                </div>
                <div className="formClient">
                    {client? `${client.firstName} ${client.lastName}`: ""}
                </div>
            </div>

            <div className="formBody">

                {/* title */}
                <label>Write a short descriptive title</label>
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
                <label>Duration</label>
                <input
                    type="time"

                    value={duration}
                    onChange={(e)=>{setDuration(e.target.value)}}
                />
                {errors.duration}

                {/* location */}
                <label>Where is this meeting happening?</label>
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
