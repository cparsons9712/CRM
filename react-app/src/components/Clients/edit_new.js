import { createNote, updateNote, removeNote , loadClientNotes} from "../../store/notes";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { useModal } from "../../context/Modal";
import "./clients.css"


function EditCreateNote({note, edit=true, clientInfo }){
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    let clientId;

    const [text, setText] = useState('');
    const [errors, setErrors] = useState([])


    let typeForm;
    if(note){
        typeForm = "Edit"
        clientId = note.clientId

    } else{
        typeForm = "Create"
        clientId = clientInfo.id
    }

    useEffect(() => {
        if (note && note.text) {
          setText(note.text);
        } else {
          setText('');
        }
      }, [note]);


    const client = useSelector((state)=> state.relationships.Clients[clientId])


    async function handleSubmit(e) {
      e.preventDefault();
      const err = [];
      if (text.length < 2) {
        err.push('Text must be at least 2 characters long.');
      }
      if(text.length > 255){
        err.push('Text must be shorter than 255 characters')
      }

      if(err.length){
        setErrors(err)
        return;
      }
        const payload = {
          text
        };
        let response;
        if (note && note.id) {
          response = await dispatch(updateNote(note.id, payload));
        } else {
          response = await dispatch(createNote(clientId, payload));
        }
        if(response && response.length){
          setErrors(response)
        }else {
          dispatch(loadClientNotes());
          closeModal();
        }
      }

    const handleDelete =() =>{
        if (typeForm === "Edit"){
            if(window.confirm('Are you sure you want to delete this note?')) {
                dispatch(removeNote(note.id));
        }}
        closeModal();
    }


    return <div className="editCreateCont">
    <div className="formHeading">
        <div className="componentTitle"> {typeForm} a Note</div>
        <div className="formClient">{client.firstName} {client.lastName}</div>
    </div>

    <div className="formBody">
      <div className="errors">
        { errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}</div>
            <textarea
            className="formTextArea"
                placeholder= "Write a note here ..."
                type="text"
                value={text}
                onChange={(e)=> setText(e.target.value)}
            />

    </div>

    <div className="formFooter">
        <button onClick={(e) => handleSubmit(e)}>
            Save
        </button>

        <button onClick={() => { handleDelete() }} >
            {typeForm === 'Edit'? 'Delete' : 'Cancel'}
        </button>


    </div>


    </div>
}

export default EditCreateNote
