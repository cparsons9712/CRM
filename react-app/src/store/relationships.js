


const GET_RELATIONSHIPS = 'relationships/GET_RELATIONSHIPS'
const GET_FREELANCERS = 'relationships/GET_FREELANCERS'
const CREATE_RELATIONSHIP = 'relationships/CREATE_RELATIONSHIP'

function retrieveRelationships(payload) {

	return {
		type: GET_RELATIONSHIPS,
		payload
	}
}

function retrieveFreelancers(payload) {
	return {
		type: GET_FREELANCERS,
		payload
	}
}

function makeRelationship(payload) {

	return {
		type: CREATE_RELATIONSHIP,
		payload
	}
}

export function getUserRelationships(){
	return async (dispatch) =>{
		const res = await fetch(`/api/relationships/`)
		if(res.ok){
			const data = await res.json();
			dispatch(retrieveRelationships(data))
		}else if (res.status < 500) {
			const data = await res.json();
			if (data.errors) {
				return data.errors;
			}
		} else {
			return ["An error occurred. Please try again."];
		}
	}
}

export function getAllFreelancers(){
	return async (dispatch) =>{

		const res = await fetch(`/api/users/freelancers`)

		if(res.ok){
			const data = await res.json();
			dispatch(retrieveFreelancers(data))
		}else if (res.status < 500) {
			const data = await res.json();
			if (data.errors) {
				return data.errors;
			}
		} else {
			return ["An error occurred. Please try again."];
		}
	}
}



export const createRelationship = (newRelationship) => async dispatch =>{
	console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')

	console.log('IN THE CREATE RELATIONSHIP THUNK')

    const response = await fetch("/api/relationships/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newRelationship),
	});
	console.log(response)


	if (response.ok) {
		const data = await response.json();
		console.log('SUCCESS!!!!!!!!!! DATA:')
		console.log(data)
		dispatch(makeRelationship(data));
		return data;
	} else if (response.status < 500) {
		const data = await response.json();
		console.log('FAILURE!!!!!!!!!! DATA:')
		console.log(data)
		if (data.errors) {
			console.log(data.errors)
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}




const initialState = {}

export default function reducer(state = initialState, action) {

	switch (action.type) {
		case GET_RELATIONSHIPS:
			const associations = action.payload;

			if ("Clients" in associations) {
			  const clientsArray = associations.Clients;
			  const clientsObject = {};

			  clientsArray.forEach((client) => {
				clientsObject[client.id] = client;
			  });

			  // Update the state with the transformed object
			  return { ...state, Clients: clientsObject };
			}else if ("Freelancers" in associations) {
				const freelancerArray = associations.Freelancers
				const freelancerObject = {}

				freelancerArray.forEach((freelancer) => {
					freelancerObject[freelancer.id] = freelancer
				})
				return {...state, Freelancers: freelancerObject}
			}else{
				return {...state}
			}
		case GET_FREELANCERS:
			const allFreelancers = action.payload
			console.log(allFreelancers)

			if("Freelancers" in allFreelancers){
				const freelancerArray = allFreelancers.Freelancers
				const freelancerObject = {}

				freelancerArray.forEach((freelancer) => {
					freelancerObject[freelancer.id] = freelancer
				})
				return {...state, AllFreelancers: freelancerObject}
			}else{
				return {...state}
			}


		case CREATE_RELATIONSHIP:
			const copyState = {...state}
			const newAssociation = action.payload
			if ("Client" in newAssociation){
				const client = newAssociation.Client
				copyState.Clients[client.id] = client
				return copyState
			}else if ("Freelancer" in newAssociation){
				const freelancer = newAssociation.Freelancer
				copyState.Freelancers[freelancer.id] = freelancer
				return copyState
			}else {
				return {...state}
			}

		default:
			return state;
	}
}
