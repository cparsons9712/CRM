import { useState } from "react";
import { createRelationship } from "../../store/relationships";
import { useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { getUserRelationships } from "../../store/relationships";
import { useDispatch } from "react-redux";

function AddClient() {
  const { closeModal } = useModal();
  const [showSearch, setShowSearch] = useState(true);
  const [email, setEmail] = useState('');
  const currentUser = useSelector((state) => state.session.user);
  const [client, setClient] = useState(null);
  const dispatch = useDispatch()

  const handleSearch = async () => {
    try {
      const res = await fetch("/api/users/");
      const data = await res.json();
      const userArr = data['users'];

      // Find the user by email
      const foundUser = userArr.find((user) => user.email === email);

      if (foundUser && foundUser.id !== currentUser.id) {
        setClient(foundUser);
        setShowSearch(false);
      } else {
        setShowSearch(false);
      }
    } catch (error) {
      console.error("Error searching for client:", error);
    }
  };
  const sendInvite = () =>{
    alert('Feature coming soon!')
  }

    const addClient = async () => {
        console.log('^^^^^^^^^^^addClient function^^^^^^^^^^^')
      const payload = {
        otherId: client.id
      };
      console.log('PAYLOAD::::::::::::')
      console.log(payload)
      try{
        const res = await dispatch(createRelationship(payload));
        console.log('RES:::::::::')
        console.log(res)
        await dispatch(getUserRelationships())
        closeModal();
        console.log('IT SHOULD HAVE WENT TO THUNK NOW')
      }catch{
        alert('there was an issue creating the relationship :(')
      }
    };

//   const foundUser = (user) => {


//     return (
//       <div className="foundClientCont">
//         <div>An account associated with that email address has been found! Would you like to add this client to your client list?</div>
//         <div>{user.firstName} {user.lastName}</div>
//         <button onClick={addClient}>Add Client</button>
//         <button onClick={() => closeModal()}>Cancel</button>
//       </div>
//     );
//   };

  return (
    <div className="addClientContainer">
      <div className={showSearch ? "search" : "hidden"}>

        <div className="searchItem">Lets check if an account already exists for this client. Search using the client's email address:</div>
        <input
          type="text"
          placeholder="Enter email here"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {client && !showSearch ? (
        <div className="searchRes">
        <div>An account associated with that email address has been found! Would you like to add this client to your client list?</div>
        <div className="orange clientName ">{client.firstName} {client.lastName}</div>

        <div>
            <button className="simpleButton small" onClick={addClient}>Add Client</button>
            <button className="simpleButton small" onClick={() => closeModal()}>Cancel</button>
        </div>

      </div>
      ): null}

      {client === null && !showSearch ? (
        <div className="searchRes">
          <div>There is no account associated with that email. Would you like to send an invite to the provided email address?</div>
          <div>
                <button onClick={sendInvite} className="simpleButton">Send Invite</button>
                <button onClick={() => closeModal() }className="simpleButton">Cancel</button>
            </div>
        </div>
      ) : null}
    </div>
  );
}

export default AddClient;
