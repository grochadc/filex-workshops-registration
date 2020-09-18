import React, { Fragment } from "react";
import { render } from "@testing-library/react";
import Home from "./Home";

test("Renders Home without crashing", () => {
  const { asFragment } = render(<Home />);
  expect(asFragment()).toMatchSnapshot();
});
