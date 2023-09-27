const GET_SCHEDULE = "schedule/GET_ALL"
const CREATE_UPDATE_SCHEDULE = "schedule/CREATE_UPDATE"

const getSchedule = (payload) => ({
    type: GET_SCHEDULE,
    payload
})

const createOrUpdateSchedule = (payload) => ({
    type: CREATE_UPDATE_SCHEDULE,
    payload
})

export const loadSchedule = (userId) => async dispatch => {
    const response = await fetch(`/api/availability/${userId}`)

    if(response.ok) {
        const data = await response.json()
        dispatch(getSchedule(data))
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

export const updateSchedule = (taskId, payload) => async dispatch =>{
	const response = await fetch(`/api/availability/${taskId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	if (response.ok) {
		const data = await response.json();
		 dispatch(createOrUpdateSchedule(data));
		return data;

	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}

	} else {

		return ["An error occurred. Please try again."];
	}
}

export const createSchedule = (payload) => async dispatch =>{
    const response = await fetch(`/api/availability/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(createOrUpdateSchedule(data));
		return data;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}


const initialState = {}
export default function reducer(state = initialState, action) {
    const copyState = {...state}
	switch (action.type) {
        case GET_SCHEDULE:
            const slot = action.payload
            copyState[slot.id] = slot
            return copyState;
        case createOrUpdateSchedule:
            const schedule = action.payload
            copyState[schedule.id] = schedule
            return copyState
		default:
			return state;
	}
}
