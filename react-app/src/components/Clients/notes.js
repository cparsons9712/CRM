// notes component
function NotesComponent ({notes}){
    return (
        <div className="sliceCont">
            {Object.values(notes).map((note)=> {

                return (
                    <div className="taskTile">

                       <div className="taskHeader">
                            <div
                            className="taskDueDate">
                                {note.createdAt}
                            </div>
                       </div>

                       <div className="TaskBody">
                            <p className="taskDescription">
                                {note.text}
                            </p>
                            
                       </div>


                    </div>
                )

            })}

        </div>
    )
}
export default NotesComponent
