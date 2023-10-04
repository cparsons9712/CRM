
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

    const response = await fetch(`/api/task/`)

    if (response.ok) {
        const data = await response.json()
        dispatch(getTask(data))
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

export const createTask = (payload) => async dispatch =>{
	console.log('********thunk*********')
	console.log('payload: ', payload)

    const response = await fetch(`/api/task/`, {
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
			return data.errors
		}
	} else {
		console.error('create Task error. An error occurred while making the request.');
		return ["An error occurred. Please try again."];
	}
}

export const updateTask = (taskId, payload) => async dispatch =>{
    console.log('^^^^^^^^ updateTask Thunk ^^^^^^^^^^^')
	console.log('Payload:::' , JSON.stringify(payload))

	const response = await fetch(`/api/task/${taskId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	if (response.ok) {
		const data = await response.json();
		console.log('^^^ Edit Task success. Received data:', data);
		 dispatch(createOrUpdateTask(data));
		return data;

	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			console.log('^^^ Edit Task Failed. Errors:', data.errors);
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
        await dispatch(deleteTask(taskId))
		await dispatch(loadAllTask());
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
			const task = action.payload;
			const clientId = task.Client.id;

			// Check if the task already exists in the all object
			if (copyState.all[task.id]) {
			  // Update the task object in the all object without modifying the byClient section
			  copyState.all[task.id] = task;
			} else {
			  // If it doesn't exist, add the task to the all object
			  copyState.all[task.id] = task;

			  if (!Array.isArray(copyState.byClient[clientId])) {
				copyState.byClient[clientId] = [];
			  }

			  const clientsTasks = copyState.byClient[clientId];
			  const taskIndex = clientsTasks.findIndex((n) => n === task.id); // Use strict equality check here
			  if (taskIndex === -1) {
				clientsTasks.push(task.id);
			  }
			}

			return copyState;


		case DELETE_TASK:
			const taskIdToDelete = action.id;
			const taskClientId = copyState.all[taskIdToDelete]?.clientId;

			// Remove the task from the all object
			if (taskIdToDelete in copyState.all) {
			  delete copyState.all[taskIdToDelete];
			}

			// Remove the task from the byClient object
			if (taskClientId && Array.isArray(copyState.byClient[taskClientId])) {
			  const clientTasks = copyState.byClient[taskClientId];
			  const taskIndex = clientTasks.indexOf(taskIdToDelete);

			  if (taskIndex !== -1) {
				clientTasks.splice(taskIndex, 1);
			  }
			}

			return copyState;

		default:
			return state;
	}
}
