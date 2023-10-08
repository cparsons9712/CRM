import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormModal from "./components/SignupFormModal";

import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import MenuBar from "./components/Navigation/SignedInBar";
import { useSelector } from 'react-redux';
import Dashboard from "./components/Dashboard";
import BookingPage from "./components/Booking/mainpage";
import TaskPage from "./components/Task";
import ClientPage from "./components/Clients";
import MessagePage from "./components/Messages/mainpage";
import { Redirect } from 'react-router-dom';
import Calender from "./components/Booking/calender";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);
  const sessionUser = useSelector(state => state.session.user)

  return (
    <>
      <Navigation isLoaded={isLoaded} />


      {isLoaded && (
        <Switch>
          <Route exact path="/" >
             <LandingPage />
          </Route>


          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/clients">
            <ClientPage />
          </Route>
          <Route path="/task">
            <TaskPage />
          </Route>
          <Route path="/calender">
            <Calender />
          </Route>
          <Route path="/messages">
            <MessagePage />
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;
