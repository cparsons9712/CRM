
import "./task.css"
import TaskDetails from "./details";
import { useModal } from "../../context/Modal";
import { useEffect, useState, useRef } from "react";
import { updateTask, completeTask} from "../../store/task";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion} from '@fortawesome/free-solid-svg-icons';
import { convertDate } from "../../util";


function TaskComponent ({task}){
    const dispatch = useDispatch()
    const contentRef = useRef(null);
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(false);

    const { setModalContent } = useModal();


    const handleTaskClick = (t) => {
        setModalContent(<TaskDetails task={t} />);
    }
    task.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));

    const scrollLeft = () => {
        const content = contentRef.current;
        if (content) {
          content.scrollLeft -= 160; // Adjust the scroll distance as needed
        }
      };

      const scrollRight = () => {
        const content = contentRef.current;
        if (content) {
          content.scrollLeft += 160; // Adjust the scroll distance as needed
        }
      };


    const getColor = (priority) => {
        if (priority === 'High'){
            return '#CC0033'
        }else if (priority === 'Med'){
            return '#CC9900'
        }else if (priority === 'Low'){
            return '#006633'
        } else{
            return 'grey'
        }
    }

    useEffect(() => {
        const handleResize = () => {
          const content = contentRef.current;
          if (content) {
            const hasOverflow = content.scrollWidth > content.offsetWidth;
            setShowLeftButton(hasOverflow);
            setShowRightButton(hasOverflow);
          }
        };

        // Add a window resize event listener
        window.addEventListener("resize", handleResize);

        // Initial calculation when the component mounts
        handleResize();

        // Clean up the event listener when the component unmounts
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, [task]);


    if( task.length){

        return (
            <div className="sliceCont">
                {showLeftButton && (
                  <button className="scroll-button left" onClick={scrollLeft}>
                     &lt;
                  </button>
                )}
                <div className="scrollable-content" ref={contentRef}>
                        {task.map((t)=> {

                            if(t){
                            return (
                                <div className="taskTile" key={t.id} onClick={()=>{handleTaskClick(t)}}>
                                    <div
                                    className="taskHeader"
                                    style={{backgroundColor: getColor(t.priority), color: 'white'}}
                                    >


                                        <div
                                        className="taskDueDate">
                                            {t?.due_date ? convertDate(t.due_date) : "none"}


                                        </div>


                                    </div>
                                <div className="TaskBody">
                                        <p className="taskDescription">
                                            {t.description}
                                        </p>
                                        <div className="taskClient" >
                                            {t.Client? `${t.Client.firstName} ${t.Client.lastName.slice(0,1)}.`: ''}
                                        </div>
                                </div>


                            </div>

                        )}else {
                            return null
                        }
                    })}
                </div>
                {showRightButton && (
          <button className="scroll-button right" onClick={scrollRight}>
            &gt;
          </button>
        )}
            </div>
    )}else{return <div className="sliceCont"></div>}
}
export default TaskComponent
