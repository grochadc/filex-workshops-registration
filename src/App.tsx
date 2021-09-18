import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Jumbotron from "react-bootstrap/Jumbotron";
import Home from "./components/Home";
import SelectionPage from "./pages/SelectionPage";
import Success from "./components/Success";
import TeacherPage from "./pages/TeacherPage";
import Dashboard from "./components/Dashboard";
import TeacherSelector from "./components/TeacherSelector";
import ReservationDetails from "./components/ReservationDetails";
import TeacherSelectorPage from "./pages/TeacherSelectorPage";

const initialDetails = {
  workshop_name: "",
  day: "",
  time: "",
  teacher_name: "",
  url: "",
  zoom_id: null,
};

export type ReservationDetailsType = {
  workshop_name: string;
  day: string;
  time: string;
  teacher_name: string;
  url: string;
  zoom_id: string | null;
};

function App() {
  const [reservationDetails, setReservationDetails] = useState(initialDetails);
  return (
    <div>
      <Jumbotron>
        <h1>FILEX WORKSHOPS</h1>
      </Jumbotron>
      <Switch>
        <Route path="/selection/:code">
          <SelectionPage setReservationDetails={setReservationDetails} />
        </Route>
        <Route path="/teacher/:id">
          <TeacherPage />
        </Route>
        <Route path="/teachers">
          <TeacherSelectorPage />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/teachers">
          <TeacherSelector />
        </Route>
        <Route path="/success">
          <Success reservationResponse={reservationDetails} />
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
