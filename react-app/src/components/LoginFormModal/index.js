import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { Redirect } from 'react-router-dom';
import "./LoginForm.css";
import { useHistory } from 'react-router-dom';


function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        history.push('/dashboard')
        closeModal()
    }
  };
  const loginDemo = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('demo@aa.io', 'password'));
    if (data) {
      setErrors(data);
    } else {
        history.push('/dashboard')
        closeModal()
    }
  }

  return (
    <div className="loginCont">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className="loginForm">

          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}

        <label>

          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
          />
        </label>
        <label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </label>
        <div className="demoUser" onClick={loginDemo}>Demo User</div>
        <button type="submit" className="submitButton">Log In</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
