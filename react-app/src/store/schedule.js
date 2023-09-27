const GET_SCHEDULE = "schedule/GET_ALL"
const CREATE_UPDATE_SCHEDULE = "schedule/CREATE_UPDATE"

const getSchedule = ( userId, payload) => ({
    type: GET_SCHEDULE,
    userId,
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
        dispatch(getSchedule(userId, data))
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

const initialState = {all:{}, byUserId:{}}
export default function reducer(state = initialState, action) {
    const copyState = {all:{...state.all}, byUserId:{...state.byUserId}}
	switch (action.type) {
        case GET_SCHEDULE:
            copyState.byUserId[action.userId] = []
            action.payload.forEach((slot) =>{
                copyState.all[slot.id] = slot
                copyState.byUserId[action.userId].push(slot.id)
            })
            return copyState;
		default:
			return state;
	}
}
