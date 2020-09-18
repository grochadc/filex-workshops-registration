import React, { Fragment } from "react";
import { render, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("Renders app without crashing", () => {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});

test("Gets a code and renders it in a new route", () => {
  const { getByLabelText, queryByText } = render(<App />);
  const codeInput = getByLabelText("Code:");
  userEvent.type(codeInput, "12345");
  expect(codeInput).toHaveValue("12345");
  userEvent.click(codeInput);
  expect(queryByText(/Hello Pedro!/i));
});
