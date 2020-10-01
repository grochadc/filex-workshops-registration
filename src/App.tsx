import React, { useState } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Router from "./components/Router";
import Home from "./components/Home";
import Selection from "./components/Selection";
import Success from "./components/Success";
import Dashboard from "./components/Dashboard";

function App() {
  const regex = /^\/dashboard/;
  const defaultRoute = regex.test(window.location.pathname)
    ? "dashboard"
    : "home";
  let teacher_param;
  if (regex.test(window.location.pathname)) {
    let params = new URL(window.location.href).searchParams;
    teacher_param = params.get("teacher");
  }
  const [code, setCode] = useState();
  const [reservation, setReservation] = useState();
  return (
    <div>
      <Jumbotron>
        <h1>FILEX WORKSHOPS</h1>
      </Jumbotron>
      <Router defaultRoute={defaultRoute}>
        <Router.View route="home">
          <Home setCode={setCode} />
        </Router.View>
        <Router.View route="selection">
          <Selection code={code} setReservation={setReservation} />
        </Router.View>
        <Router.View route="success">
          <Success reservation={reservation} />
        </Router.View>
        <Router.View route="dashboard">
          <Dashboard teacher={teacher_param} />
        </Router.View>
      </Router>
    </div>
  );
}

export default App;
