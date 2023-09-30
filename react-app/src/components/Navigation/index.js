import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import MenuBar from './SignedInBar';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
	<div className='NavBarCont'>
		<h1 className='bantam'>Bantam</h1>


		{sessionUser && (
			<MenuBar />
		)}

		{isLoaded && (

			<ProfileButton user={sessionUser} />

		)}
	</div>

	);
}

export default Navigation;
