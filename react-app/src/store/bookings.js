const GET_BOOKINGS = "booking/GET_ALL"
const CREATE_UPDATE_BOOKING = "booking/CREATE_UPDATE"
const DELETE_BOOKING = "booking/DELETE"

const getBookings = (payload) => ({
    type: GET_BOOKINGS,
    payload
})

const createOrUpdateBooking = (payload) => ({
    type: CREATE_UPDATE_BOOKING,
    payload
})

const deleteBooking = id => ({
    type: DELETE_BOOKING,
    id
})

export const loadFreelancerBookings = (userId) => async dispatch => {

    const response = await fetch(`/api/booking/freelancer/${userId}`)

    if (response.ok) {
        const data = await response.json()
        dispatch(getBookings(data))
    } else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			console.log('!!!!!!!!!!!!!!', data.errors)
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}

export const loadBookingsWithUser = (userId) => async dispatch => {

    const response = await fetch(`/api/booking/${userId}`)

    if (response.ok) {
        const data = await response.json()
        dispatch(getBookings(data))
    } else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			console.log('!!!!!!!!!!!!!!', data.errors)
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}

export const createBooking = (userId, payload) => async dispatch =>{


    const response = await fetch(`/api/booking/${userId}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	if (response.ok) {
		const data = await response.json();
		console.log('$$$$ create Booking success. Received data:', data);
		dispatch(createOrUpdateBooking(data));
		return data;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			console.log('$$$$ create Booking validation errors:', data.errors);
			return data.errors;
		}
	} else {
		console.error('Create Booking failed. A random error occurred while making the request.');
		return ["An error occurred. Please try again."];
	}
}

export const updateBooking = (bookingId, payload) => async dispatch =>{
    console.log('^^^^^^^^ update Booking Thunk ^^^^^^^^^^^')
	console.log('Payload:::' , JSON.stringify(payload))

	const response = await fetch(`/api/booking/${bookingId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	if (response.ok) {
		const data = await response.json();
		console.log('^^^ Edit Booking success. Received data:', data);
		 dispatch(createOrUpdateBooking(data));
		return data;

	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			console.log('^^^ Edit Booking Failed. Errors:', data.errors);
			return data.errors;
		}

	} else {
		console.error('^^^^ Unexpected Error');
		return ["An error occurred. Please try again."];
	}
}

export const removeBooking = bookingId => async dispatch => {
    const response = await fetch(`/api/booking/${bookingId}`,{
        method: 'DELETE',
    })
    if (response.ok){
        await dispatch(deleteBooking(bookingId))
		console.log(`Booking ${bookingId} deleted`)
        return {"message": "Booking Deleted Successfully"}
    }else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			console.log("Booking NOT DELETED. REASON:", data.errors)
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}

const initialState = {all:{}, byClient:{}}

export default function reducer(state = initialState, action) {
	const copyState = {all:{...state.all}, byClient:{...state.byClient}}
	const cleanState = {all: {}, byClient: {}}
	switch (action.type) {
		case GET_BOOKINGS:
			action.payload.forEach((booking) => {
				let clientId = booking.Client.id
				cleanState.all[booking.id] = booking;
				if (!cleanState.byClient[clientId]) {
					cleanState.byClient[clientId] = [];
				}
				cleanState.byClient[clientId].push(booking.id);
			});
			return cleanState;

		case CREATE_UPDATE_BOOKING:
			const booking = action.payload;
			const clientId = booking.Client.id;

			// Check if the booking already exists in the all object
			if (copyState.all[booking.id]) {
			  // Update the booking object in the all object without chanigng the byClient section(because its already there)
			  copyState.all[booking.id] = booking;
			} else {
			  // If it doesn't exist, add the booking to the all object AND add it into client's array
			  copyState.all[booking.id] = booking;

                //   if there isnt an array yet for that client make one
			  if (!Array.isArray(copyState.byClient[clientId])) {
				copyState.byClient[clientId] = [];
			  }

                //   Double check that the client does NOT have the id in thier bookings already before pushing to ensure no double id numbers in their array
			  const clientsBooking = copyState.byClient[clientId];
			  const bookingIndex = clientsBooking.findIndex((n) => n === booking.id);
			  if (bookingIndex === -1) {
				clientsBooking.push(booking.id);
			  }
			}

			return copyState;


		case DELETE_BOOKING:
            // get the client's id from the booking before deleting so that we can also remove the id from the client's array
			const bookingId = action.id;
			const ClientId = copyState.all[bookingId]?.clientId;

			// Remove the booking from the all object
			if (bookingId in copyState.all) {
			  delete copyState.all[bookingId];
			}

			// Remove the booking from the byClient object
			if (ClientId && Array.isArray(copyState.byClient[ClientId])) {
                // get the array of ids
			  const clientBookings = copyState.byClient[ClientId];
                // get the index where the id is
			  const bookingIndex = clientBookings.indexOf(bookingId);
                // double check that we found the id in the array
			  if (bookingIndex !== -1) {
                // copy the entire array excluding the id we are deleting
				clientBookings.splice(bookingIndex, 1);
			  }
			}

			return copyState;

		default:
			return state;
	}
}
