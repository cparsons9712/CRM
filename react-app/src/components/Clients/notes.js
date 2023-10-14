// notes component
import { useState , useEffect, useRef} from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

import EditCreateNote from "./edit_new";

import { convertDate } from "../../util";



function NotesComponent ({notes}){
    const { setModalContent } = useModal();

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

                       <div className="noteHeader">
                            <div
                            className="noteCreated">
                                {convertDate(note.createdAt)}

                            </div>
                       </div>

                       <div className="TaskBody">
                            <div className="noteDescription">
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
