import React, { Fragment, useState } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Router from "./components/Router";
import Home from "./components/Home";
import Selection from "./components/Selection";

function App() {
  const defaultRoute =
    process.env.NODE_ENV === "development" ? "selection" : "home";
  const [currentRoute, setCurrentRoute] = useState(defaultRoute);
  const [code, setCode] = useState();
  return (
    <div>
      <Jumbotron>
        <h1>FILEX WORKSHOPS</h1>
      </Jumbotron>
      <Router
        currentRoute={currentRoute}
        render={(currentRoute: string) => (
          <Fragment>
            <Router.View route="home" currentRoute={currentRoute}>
              <Home setCurrentRoute={setCurrentRoute} setCode={setCode} />
            </Router.View>
            <Router.View route="selection" currentRoute={currentRoute}>
              <Selection code={code} />
            </Router.View>
          </Fragment>
        )}
      />
    </div>
  );
}

export default App;
