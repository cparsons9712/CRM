import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import AddClient from "../Clients/addClientUser";
import { useModal } from "../../context/Modal";
import ProfileModal from "../Profile/userProfileModal";


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory()
  const {setModalContent} = useModal()

  const openMenu = () => {
    setModalContent(<ProfileModal userInfo={user} />)
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && e.target) {
        if (!ulRef.current.contains(e.target)) {
          setShowMenu(false);
        }
      } else {
        console.error("ulRef.current or e.target is null or undefined");
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = async (e) => {
    e.preventDefault();
    history.push('/')
    await dispatch(logout());
    history.push('/')

  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>{user ? (


    <div className="loginbtnCont" >
      <FontAwesomeIcon icon={faUser} className="userIcon" onClick={openMenu} />

      {/* <div onClick={openMenu}>onClick={setModalContent(<ProfileModal userInfo={user} />)}
       <FontAwesomeIcon icon={faUser} className="userIcon"  />
      </div> */}
      {/* <div className={ulClassName} ref={ulRef}>

          <div className="userMenu">

            <div className="userGreeting">Hello {user.firstName}!</div>
            <hr></hr>
            <div onClick={()=>{setModalContent(<AddClient />)} } className="userMenuLink">Add Client</div>
            <hr></hr>
            <div onClick={handleLogout} className="userMenuLink">Log Out</div>

          </div>
        </div> */}
    </div>


  ) : (
    <div className="loginbtnCont">
      <OpenModalButton
        id="loginBtn"
        buttonText="Log In"
        onItemClick={closeMenu}
        modalComponent={<LoginFormModal />}
      />
    </div>
  )}

  </>
);}

export default ProfileButton;
