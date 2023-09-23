
const GET_TASK = "task/GET_ALL"
const CREATE_UPDATE_TASK = "task/CREATE_UPDATE"
const DELETE_TASK = "task/DELETE"

const getTask = (payload) => ({
    type: GET_TASK,
    payload
})

const createOrUpdateTask = (payload) => ({
    type: CREATE_UPDATE_TASK,
    payload
})

const deleteTask = id => ({
    type: DELETE_TASK,
    id
})
export const loadAllTask = () => async dispatch => {
	console.log('IN THE TASK THUNK')
    const response = await fetch(`api/task/`)
	console.log('RESPONSE:', response)
    if (response.ok) {
        const data = await response.json()
		console.log('SUCCESS --- data: ', data)
        dispatch(getTask(data))
    } else if (response.status < 500) {
		const data = await response.json();
		console.log('FAILURE ---- data: ', data)
		if (data.errors) {
			console.log("An Error occured:", data.errors)
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}

export const createTask = (payload) => async dispatch =>{
    const response = await fetch(`api/task`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	if (response.ok) {
		const data = await response.json();
		console.log('$$$$ create Task success. Received data:', data);
		dispatch(createOrUpdateTask(data));
		return data;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			console.log('$$$$ create Task validation errors:', data.errors);
			return data.errors;
		}
	} else {
		console.error('create Task error. An error occurred while making the request.');
		return ["An error occurred. Please try again."];
	}
}

export const updateTask = (taskId, payload) => async dispatch =>{
    const response = await fetch(`/api/task/${taskId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	if (response.ok) {
		const data = await response.json();
		console.log('$$$$ Edit Task success. Received data:', data);
		dispatch(createOrUpdateTask(data));
		return data;

	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			console.log('$$$$ Edit Task Failed. Errors:', data.errors);
			return data.errors;
		}

	} else {
		console.error('$$$$ Unexpected Error');
		return ["An error occurred. Please try again."];
	}
}

export const removeTask = taskId => async dispatch => {
    const response = await fetch(`/api/task/${taskId}`,{
        method: 'DELETE',
    })
    if (response.ok){
        dispatch(deleteTask(taskId))
		console.log(`Task ${taskId} deleted`)
        return {"message": "Task Deleted Successfully"}
    }else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			console.log("TASK NOT DELETED. REASON:", data.errors)
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
		case GET_TASK:

			action.payload.forEach((task) => {
				let clientId = task.Client.id
				cleanState.all[task.id] = task;
				if (!cleanState.byClient[clientId]) {
					cleanState.byClient[clientId] = [];
				}
				cleanState.byClient[clientId].push(task.id);
			});
			return cleanState;

		case CREATE_UPDATE_TASK:
			const task = action.payload
			let clientId = task.Client.id
			copyState.all[task.id] = task
			const clientsTasks = copyState.byClient[clientId];
			const taskIndex = clientsTasks.findIndex((n) => n.id === task.id);
			if(taskIndex === -1){
				clientsTasks.push(task.id)
			}
			return copyState;
		case DELETE_TASK:
			const IdToDelete = action.id;

			const taskclientId = copyState.all[IdToDelete].clientId;
			delete copyState.all[IdToDelete];

			if (taskclientId in copyState.byClient) {
				const clientTask = copyState.byClient[taskclientId];
				const noteIndex = clientTask.indexOf(taskclientId);
				if (noteIndex !== -1) {
					clientTask.splice(noteIndex, 1);
				}
			}
			return copyState

		default:
			return state;
	}
}
