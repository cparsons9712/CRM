import { useEffect, useState } from "react";
import { createRelationship } from "../../store/relationships";
import { useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { getUserRelationships } from "../../store/relationships";
import { useDispatch } from "react-redux";

function AddClient() {
  const { closeModal } = useModal();
  const dispatch = useDispatch()

  const [showSearch, setShowSearch] = useState(true);
  const [email, setEmail] = useState('');
  const [client, setClient] = useState(null);
  const [exist, setExist] = useState(false)

  useEffect(()=>{dispatch(getUserRelationships())},[dispatch])

  const currentUser = useSelector((state) => state.session.user);
  const currentClientList = useSelector((state) => state.relationships.Clients)

  const handleSearch = async () => {
    try {
      const res = await fetch("/api/users/");
      const data = await res.json();
      const userArr = data['users'];

      // Find the user by email
      const foundUser = userArr.find((user) => user.email === email);

      const isCurrent = Object.values(currentClientList).find((user) => user.email === email)



      if (foundUser) {
        setClient(foundUser);
        setShowSearch(false);
        if(isCurrent || foundUser.id === currentUser.id){
          setExist(true)
        }
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
      const payload = {
        otherId: client.id
      };
      try{
        const res = await dispatch(createRelationship(payload));
        await dispatch(getUserRelationships())
        closeModal();
      }catch{
        alert('there was an issue creating the relationship :(')
      }
    };



  return (
    <div className="addClientContainer">
      <div className="clientName add">Add a Client</div>
      <div className={showSearch ? "search" : "hidden"}>

        <div className="searchItem">Lets check if an account already exists for this client. Search using the client's email address:</div>
        <input
          type="text"
          placeholder="Enter email here"
          value={email}
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
          required
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {client && !showSearch  && !exist ? (
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

      {client && !showSearch && exist ? (
        <div className="searchRes">
          <div>This account is already associated with you!</div>
          <div>Result:</div>
          <div className="orange clientName ">{client.firstName} {client.lastName}</div>
          <div>
          <button onClick={() => closeModal() }className="simpleButton">Close</button>
          </div>
      </div>
      ): null}
    </div>
  );
}

export default AddClient;
