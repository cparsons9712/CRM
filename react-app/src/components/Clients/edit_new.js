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
    const [errors, setErrors] = useState({})


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
        const err = {};
        if (!text.length) {
          err.text = 'Text cannot be empty';
          setErrors(err);
          return;
        }
        const payload = {
          text
        };
        if (note && note.id) {
          dispatch(updateNote(note.id, payload));
        } else {
          const response = await dispatch(createNote(clientId, payload));
          // Check if the note creation was successful before reloading client notes.
          if (response && !response.errors) {
            // Note creation was successful, so reload the client's notes.
            dispatch(loadClientNotes());
          }
        }

        closeModal();
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
            <textarea
            className="formTextArea"
                placeholder= "Write a note here ..."
                type="text"
                value={text}
                onChange={(e)=> setText(e.target.value)}
            />
            {errors.text}
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