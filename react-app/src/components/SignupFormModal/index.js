import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";
import { validateEmail } from "../../util";
import { useHistory } from 'react-router-dom';


function SignupFormModal() {
	const dispatch = useDispatch();
	const history = useHistory()
	const { closeModal } = useModal();

	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	// const [authLevel, setAuthLevel]= useState(0)
	const [errors, setErrors] = useState([]);



	const handleSubmit = async (e) => {
		e.preventDefault();
		const err = []
		if (!validateEmail(email)) err.push("Please enter a valid email.")
		if(password !== confirmPassword) err.push("Password and confirm password must match")
		if(phoneNumber.length !== 10)err.push("Please enter a 10 digit phone number")



		if (password === confirmPassword && validateEmail(email) ) {

			const data = await dispatch(signUp({phoneNumber, email, password, firstName, lastName, authLevel: 1}));
			if (data) {
				setErrors(data);
			} else {
				history.push('/dashboard')
				history.push('/dashboard')
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

		<div className="signUpCont">
			<div className="signUpTitle">Nice to meet you!</div>

			<form className="loginForm" onSubmit={handleSubmit}>
				<div className="errors">
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</div>

				<div className="signUpSecHead">Whats your Name?</div>
				<div className="signUpSect">
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
				</div>

				<div className="signUpSecHead">How can we contact you?</div>
				<div className="signUpSect">
					<label>
						<input
						placeholder="Email"
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value.toLowerCase())}
							required
						/>
					</label>

					<label>

						<input
						placeholder="Phone Number"
							type="text"
							value={phoneNumber}
							onChange={(e) => setPhoneNumber(e.target.value)}
							required
						/>
					</label>
				</div>

				<div className="signUpSecHead">Set a super secret password!</div>
				<div className="signUpSect">
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
				</div>


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
				<button type="submit" className="simpleButton" id="submitSignup">Sign Up</button>
			</form>
		</div>
	);
}

export default SignupFormModal;
