import React, { useState } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Router from "./components/Router";
import Home from "./components/Home";
import Selection from "./components/Selection";

function App() {
  const defaultRoute =
    process.env.NODE_ENV === "development" ? "selection" : "home";
  const [code, setCode] = useState();
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
          <Selection code={code} />
        </Router.View>
      </Router>
    </div>
  );
}

export default App;
