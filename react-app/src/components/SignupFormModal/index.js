import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";
import { validateEmail } from "../../util";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	// const [authLevel, setAuthLevel]= useState(0)
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();


	const handleSubmit = async (e) => {
		e.preventDefault();
		const err = []
		if (!validateEmail(email)) err.push("Please enter a valid email.")
		if(password !== confirmPassword) err.push("Password and confirm password must match")



		if (password === confirmPassword && validateEmail(email) ) {

			const data = await dispatch(signUp({username, email, password, firstName, lastName, authLevel: 1}));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors(err);
		}
	};

	// const handleRoleChange = (event) => {
	// 	const newValue = parseInt(event.target.value, 10); // Parse the value as an integer
	// 	setAuthLevel(newValue);
	//   };

	return (
		<div className="loginCont">
			<h1>Sign Up</h1>
			<form className="loginForm" onSubmit={handleSubmit}>
				<div className="errors">
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</div>
				<label>
					<input
						placeholder="First Name"
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
				</label>

				<label>
					<input
						placeholder="Last Name"
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
				</label>

				<label>
					<input
					placeholder="Email"
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>

				<label>

					<input
					placeholder="Username"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<label>

					<input
					placeholder="Password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<label>

					<input
					placeholder="Confirm Password"
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				{/* <div className="radio-slider">
					<input
						type="radio"
						name="role"
						value="0"
						checked={authLevel === 0}
						onChange={handleRoleChange}
						id="customer"
					/>
					<label htmlFor="customer">Customer</label>
					<input
						type="radio"
						name="role"
						value="1"
						checked={authLevel === 1}
						onChange={handleRoleChange}
						id="freelancer"
					/>
					<label htmlFor="freelancer">Freelancer</label>
				</div> */}
				<button type="submit">Sign Up</button>
			</form>
		</div>
	);
}

export default SignupFormModal;
