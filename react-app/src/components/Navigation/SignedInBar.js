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
        <nav>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/clients">Clients</NavLink>
          <NavLink to="/task">Task</NavLink>
          <NavLink to="/">Calender</NavLink>
          <NavLink to="/">Messages</NavLink>
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
