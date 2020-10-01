import React, { useState } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Router from "./components/Router";
import Home from "./components/Home";
import Selection from "./components/Selection";
import Success from "./components/Success";
import Dashboard from "./components/Dashboard";
import TeacherSelector from "./components/TeacherSelector";

function App() {
  const dashboard_regex = /^\/dashboard/;
  const teachers_regex = /^\/teachers/;
  const path = window.location.pathname;
  const defaultRoute = dashboard_regex.test(path)
    ? "dashboard"
    : teachers_regex.test(path)
    ? "teachers"
    : "home";
  let teacher_param;
  if (dashboard_regex.test(window.location.pathname)) {
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
        <Router.View route="teachers">
          <TeacherSelector />
        </Router.View>
      </Router>
    </div>
  );
}

export default App;
