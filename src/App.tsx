import React, { Fragment, useState, useEffect } from "react";
import useFetch from "./lib";
import Router from "./components/Router";
import Home from "./components/Home";
import Selection from "./components/Selection";

function App() {
  const [currentRoute, setCurrentRoute] = useState("home");
  const [code, setCode] = useState();
  useEffect(() => {
    fetch("/students/12345")
      .then(response => response.json())
      .then(console.log)
      .catch(console.error);
  });
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
              <Selection student={{ name: "Pedro" }} />
            </Router.View>
          </Fragment>
        )}
      />
    </div>
  );
}

export default App;
