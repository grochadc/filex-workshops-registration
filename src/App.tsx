import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Jumbotron from "react-bootstrap/Jumbotron";
import Home from "./components/Home";
import Selection from "./components/Selection";
import Success from "./components/Success";
import Dashboard from "./components/Dashboard";
import TeacherSelector from "./components/TeacherSelector";

function App() {
  const [code, setCode] = useState();
  const [reservation, setReservation] = useState<Reservation>();
  return (
    <div>
      <Jumbotron>
        <h1>FILEX WORKSHOPS</h1>
      </Jumbotron>
      <Switch>
        <Route path="/someroute">
          <h1>thisis a Route</h1>
        </Route>
        <Route path="/selection/:code">
          <Selection code={code} setReservation={setReservation} />
        </Route>
        <Route path="/success">
          <Success reservation={reservation} />
        </Route>
        <Route path="/dashboard/:teacher">
          <Dashboard />
        </Route>
        <Route path="/teachers">
          <TeacherSelector />
        </Route>
        <Route path="/">
          <Home setCode={setCode} />
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
