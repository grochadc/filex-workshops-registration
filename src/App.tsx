import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Jumbotron from "react-bootstrap/Jumbotron";
import Home from "./components/Home";
import Selection from "./components/Selection";
import Success from "./components/Success";
import TeacherDashboard from "./components/TeacherDashboard";
import Dashboard from "./components/Dashboard";
import TeacherSelector from "./components/TeacherSelector";
import ReservationDetails from "./components/ReservationDetails";

function App() {
  const [reservationResponse, setReservationResponse] = useState({
    makeWorkshopReservation: {
      id: "",
      timestamp: "",
      codigo: "",
      nombre: "",
      url: "",
    },
  });
  const [reservationDetails, setReservationDetails] = useState({
    workshopName: "",
    day: "",
    time: "",
    teacher: "",
    url: "",
    zoom_id: null,
  });
  return (
    <div>
      <Jumbotron>
        <h1>FILEX WORKSHOPS</h1>
      </Jumbotron>
      <Switch>
        <Route path="/selection/:code">
          <Selection
            setReservation={setReservationResponse}
            setReservationDetails={setReservationDetails}
          />
        </Route>
        <Route path="/success">
          <Success reservationResponse={reservationResponse} />
        </Route>
        <Route path="/dashboard/:teacher">
          <TeacherDashboard />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/teachers">
          <TeacherSelector />
        </Route>
        <Route path="/details">
          <ReservationDetails reservationDetails={reservationDetails} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://docs.google.com/forms/d/e/1FAIpQLSdIdtnyAzbTcOlkCbwCpIWM3vrMNRfA_5DamsK4wosCrz3Ybg/viewform?usp=sf_link"
      >
        Reportar un problema
      </a>
    </div>
  );
}

export default App;
