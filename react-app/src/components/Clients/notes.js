import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import EditCreateNote from "./edit_new";
import { convertDate } from "../../util";

function NotesComponent({ notes }) {
  const { setModalContent } = useModal();
  const contentRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

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
  }, [notes]);



  return (
    <div className="sliceCont">
                      {showLeftButton && (
                  <button className="scroll-button left" onClick={scrollLeft}>
                     &lt;
                  </button>
                )}
                <div className="scrollable-content" ref={contentRef}>
        {Object.values(notes).map((note) => {
                return (
                <div
                    className="taskTile"
                    key={note.id}
                    onClick={() => setModalContent(<EditCreateNote note={note} />)}
                >
                        <div className="noteHeader">
                            <div className="noteCreated">{convertDate(note.createdAt)}</div>
                        </div>
                        <div className="TaskBody">
                            <div className="noteDescription">{note.text}</div>
                        </div>
                </div>
                );
        })}
        </div>
      {showRightButton && (
        <button className="scroll-button right" onClick={scrollRight}>
          &gt;
        </button>
      )}
    </div>
  );
}

export default NotesComponent;
