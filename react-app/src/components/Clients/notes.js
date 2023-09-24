// notes component
import { useState , useEffect, useRef} from "react";
import { useDispatch } from "react-redux";

import { useModal } from "../../context/Modal";
import EditCreateNote from "./edit_new";



function NotesComponent ({notes}){


    const { setModalContent } = useModal();



    const formattDate = (date) =>{
        const day = date.slice(4, 16)

        return day
    }
    const handleNoteClick = (note) => {
        setModalContent(<EditCreateNote note={note} />);
      };

    return (
        <div className="sliceCont">
            {Object.values(notes).map((note)=> {

                return (
                    <div
                        className="taskTile"
                        key={note.id}
                        onClick={() => handleNoteClick(note)}
                    >

                       <div className="taskHeader">
                            <div
                            className="taskDueDate">
                                {formattDate(note.createdAt)}
                            </div>
                       </div>

                       <div className="TaskBody">
                            <div className="taskDescription">
                                {note.text}
                            </div>

                       </div>


                    </div>
                )

            })}

        </div>
    )
}
export default NotesComponent
