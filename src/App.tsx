import React, { Fragment, useState } from "react";
import Router from "./components/Router";
import Home from "./components/Home";
import Selection from "./components/Selection";

function App() {
  const [currentRoute, setCurrentRoute] = useState("home");
  const [code, setCode] = useState();
<<<<<<< HEAD
  const { response, error, loading } = useFetch("/students/12345");
=======
>>>>>>> 0d67741f01d38a3c20bcf2565efe68b325f7a7e2
  return (
    <div>
      <Router
        currentRoute={currentRoute}
        render={(currentRoute: string) => (
          <Fragment>
            <Router.View route="home" currentRoute={currentRoute}>
              <Home setCurrentRoute={setCurrentRoute}
              setCode={setCode} />
            </Router.View>
            <Router.View route="selection" currentRoute={currentRoute}>
<<<<<<< HEAD
              {loading ? <p>Loading...</p> : <Selection student={response} />}
=======
              <Selection code={code} />
>>>>>>> 0d67741f01d38a3c20bcf2565efe68b325f7a7e2
            </Router.View>
          </Fragment>
        )}
      />
    </div>
  );
}

export default App;
