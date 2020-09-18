import React, { Fragment } from "react";
import { render } from "@testing-library/react";
import Selection from "./Selection";

test("Renders without crashing", () => {
  const { asFragment } = render(<Selection student={{ name: "Pedro" }} />);
  expect(asFragment()).toMatchSnapshot();
});
