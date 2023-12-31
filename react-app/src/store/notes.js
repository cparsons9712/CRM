const GET_CLIENTS_NOTES = "note/GET_ALL"
const CREATE_UPDATE_NOTE = "note/CREATE_UPDATE"
const DELETE_NOTE = "note/DELETE"

const getClientsNotes = (payload) => ({
    type: GET_CLIENTS_NOTES,
    payload
})

const createOrUpdateNote = (payload) => ({
    type: CREATE_UPDATE_NOTE,
    payload
})

const deleteNote = id => ({
    type: DELETE_NOTE,
    id
})

export const loadClientNotes = () => async dispatch => {

    const response = await fetch(`/api/notes/`)
    if (response.ok) {
        const data = await response.json()
        dispatch(getClientsNotes(data))
    } else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}

export const createNote = (client_id, payload ) => async dispatch =>{
    const response = await fetch(`/api/notes/${client_id}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	if (response.ok) {
		const data = await response.json();
		//console.log('$$$$ createNote success. Received data:', data);
		dispatch(createOrUpdateNote(data));
		return data;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			//console.log('$$$$ createNote validation errors:', data.errors);
			return data.errors;
		}
	} else {
		console.error('createNote error. An error occurred while making the request.');
		return ["An error occurred. Please try again."];
	}
}

export const updateNote = (note_id, payload) => async dispatch =>{
    const response = await fetch(`/api/notes/${note_id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	if (response.ok) {
		const data = await response.json();
		//console.log('$$$$ Edit Note success. Received data:', data);
		dispatch(createOrUpdateNote(data));
		return data;

	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			//console.log('$$$$ Edit Note Failed. Errors:', data.errors);
			return data.errors;
		}

	} else {
		console.error('$$$$ Unexpected Error');
		return ["An error occurred. Please try again."];
	}
}

export const removeNote = note_id => async dispatch => {
    const response = await fetch(`/api/notes/${note_id}`,{
        method: 'DELETE',
    })
    if (response.ok){
        dispatch(deleteNote(note_id))
        return {"message": "Task Deleted Successfully"}
    }else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}


const initialState = {byClient:{}, all:{}}

export default function reducer(state = initialState, action) {
	const copyState = {byClient:{...state.byClient}, all:{...state.all}}
	const cleanState = {all: {}, byClient: {}}

	switch (action.type) {
		case GET_CLIENTS_NOTES:
			// Check to make sure theres something in the payload or you'll get errors
			if (action.payload.length){

			// we will have an all object sorted by note id to make it easy to find the specific note we need to update or delete and we will have an array of ids for each client id so when we open up a client folder we can find the data we need quicker
				action.payload.forEach((note) => {
					let clientId = note.clientId
					cleanState.all[note.id] = note;
					if(!cleanState.byClient[clientId]){
						cleanState.byClient[clientId] = [];
					}
					cleanState.byClient[clientId].push(note.id);
				});
			}

			return cleanState;

		case CREATE_UPDATE_NOTE:
			const note = action.payload
			const clientId = note.clientId
			copyState.all[note.id] = note
			// get the array of ids for the client this note was made for
			const clientsNotes = copyState.byClient[note.clientId] || [];

			// check if the note currently exist
			const noteIndex = clientsNotes.indexOf(note.id);


			if(noteIndex === -1){
				// if the note doesn't exist add the id to the client's array
				copyState.byClient[clientId] = clientsNotes
			}
			return copyState;

		case DELETE_NOTE:
			const noteIdToDelete = action.id;
			// use the id to get the clientId of the note from the state then delete it
			const notesclientId = copyState.all[noteIdToDelete].clientId;
			delete copyState.all[noteIdToDelete];
			// doublecheck that we have a key of that id in byClient, then get the index of the id inside of the array and remove it with splice
			if (notesclientId in copyState.byClient) {
				const clientNotes = copyState.byClient[notesclientId];
				const noteIndex = clientNotes.indexOf(noteIdToDelete);
				if (noteIndex !== -1) {
					clientNotes.splice(noteIndex, 1);
				}
			}
			return copyState

		default:
			return state;
	}

}
