import React, { Fragment } from "react";
import { render } from "@testing-library/react";
import Router from "./Router";

test("Renders corresponding view on currentRoute prop", () => {
  const App = () => {
    return (
      <Router
        currentRoute="home"
        render={(currentRoute: string) => (
          <Fragment>
            <Router.View route="home" currentRoute={currentRoute}>
              This is the homepage.
            </Router.View>
          </Fragment>
        )}
      />
    );
  };
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});
