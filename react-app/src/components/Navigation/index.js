import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
	<div className='NavBarCont'>

		<NavLink exact to="/" >
  			<img src='/logo.png' className='logo' alt="Logo" />
		</NavLink>
		<h1 className='bantam'>Bantam</h1>

		{isLoaded && (

			<ProfileButton user={sessionUser} />

		)}
	</div>

	);
}

export default Navigation;
