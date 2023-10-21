import './profile.css'
import { logout } from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import { convertPhone } from '../../util';

function ProfileModal ({userInfo}){
    const dispatch = useDispatch();
    const history = useHistory()
    const { closeModal } = useModal();


    const handleLogout = async (e) => {
        e.preventDefault();
        closeModal()
        history.push('/')
        await dispatch(logout());
        history.push('/')
      };

    return(
        <div className="profileCont">


            <div className="profileTop">
                <div className="profileTopLeft">
                    <div className='profileName'>{userInfo.firstName} {userInfo.lastName}</div>
                    <p className='profileDet'>{userInfo.title}</p>
                    {/* Insert avg rating here */}
                </div>

                <div className="profileTopRight">
                    {/* insert profile picture here */}
                </div>

            </div>


            <div className="profileContent">
                <div className="pcLeftSide">
                    <div className="contentBlock">
                        <h3>About Me:</h3>
                        <p>{userInfo.aboutMe}</p>
                    </div>

                    <div className="contentBlock">
                        {/* services go here */}
                    </div>
                </div>

                <div className="pcRightSide">
                    <div className="contentBlock">
                        <h3>Contact Me:</h3>
                        <p>{userInfo.email}</p>
                        {/* Change to test if render is resetting data each deploy */}
                        <p>{convertPhone(userInfo.phoneNumber)}</p>
                    </div>

                    <div className="contentBlock">
                        {/* avaliability goes here */}
                    </div>
                </div>
            </div>


            <div className="profileButtons">
                <button>Edit Profile</button>
                <button onClick={handleLogout}>Log Out</button>
            </div>

        </div>
    )
}

export default ProfileModal
