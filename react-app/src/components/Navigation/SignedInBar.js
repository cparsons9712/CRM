import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navigation.css';

function MenuBar(){
	const sessionUser = useSelector(state => state.session.user);

    return (
        <div>
          {sessionUser.authLevel === 1 ? (
            <NavigationForFreelancers />
          ) : (
            <NavigationForClients />
          )}
        </div>
      );
    };

    const NavigationForFreelancers = () => {
      // Render navigation for authLevel 0
      return (
        <nav className='signedInBar'>
          <NavLink className="userBar" to="/dashboard">Dashboard</NavLink>
          <NavLink className="userBar" to="/clients">Clients</NavLink>
          <NavLink className="userBar" exact to="/task">Task</NavLink>
          <NavLink className="userBar" exact to="/calender">Calender</NavLink>
          {/* <NavLink className="userBar" exact to="/messages">Messages</NavLink> */}
        </nav>
      );
    };

    const NavigationForClients = () => {
      // Render navigation for authLevel 1
      return (
        <nav>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/">Freelancers</NavLink>
          <NavLink to="/">Calender</NavLink>
          <NavLink to="/">Messages</NavLink>
        </nav>
      );
    };

export default MenuBar;
