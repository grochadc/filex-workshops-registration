import React, { Fragment, useState } from "react";
import Router from "./components/Router";
import Home from "./components/Home";

function App() {
  const [currentRoute, setCurrentRoute] = useState("home");
  const [code, setCode] = useState();
  return (
    <div>
      <Router
        currentRoute={currentRoute}
        render={(currentRoute: string) => (
          <Fragment>
            <Router.View route="home" currentRoute={currentRoute}>
              <Home setCurrentRoute={setCurrentRoute} setCode={setCode} />
            </Router.View>
            <Router.View route="selection" currentRoute={currentRoute}>
              <p>You chose the code: {code}</p>
            </Router.View>
          </Fragment>
        )}
      />
    </div>
  );
}

export default App;
