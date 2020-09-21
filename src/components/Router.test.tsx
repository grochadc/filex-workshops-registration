import React, { Fragment, useState, useEffect } from "react";
import { render, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Router from "./Router";

const App = () => {
  return (
    <Router
      currentRoute={"home"}
      render={(currentRoute: string) => (
        <Fragment>
          <Router.View route="home" currentRoute={currentRoute}>
            This is the homepage.
          </Router.View>
          <Router.View route="selection" currentRoute={currentRoute}>
            This is the selection page.
          </Router.View>
        </Fragment>
      )}
    />
  );
};

test("Renders without crashing [Snapshot]", () => {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});

test("Renders only one route and nothing else", () => {
  const { getByText, queryByText } = render(<App />);
  expect(getByText(/homepage/i)).toBeInTheDocument();
  expect(queryByText(/selection/i)).not.toBeInTheDocument();
});
