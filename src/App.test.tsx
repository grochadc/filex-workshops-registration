import React, { Fragment } from "react";
import { render, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("Renders app without crashing", () => {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});

test("Gets a code and renders it in a new route", () => {
  const { getByLabelText } = render(<App />);
  userEvent.type(getByLabelText("Code:"), "12345");
  expect(getByLabelText("Code:")).toHaveValue("12345");
});
