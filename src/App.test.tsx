import React, { Fragment } from "react";
import { render, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

beforeAll(() => jest.spyOn(window, "fetch"));

test("Renders app without crashing", () => {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});

test("Gets a code and renders it in a new route", () => {
  const { getByLabelText, queryByText, getByText } = render(<App />);
  window.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ name: "Pedro Paramo" })
  });
  const codeInput = getByLabelText("Code:");
  userEvent.type(codeInput, "12345");
  expect(codeInput).toHaveValue("12345");
  userEvent.click(getByText(/Submit/i));
  expect(window.fetch).toHaveBeenCalledTimes(2);
  expect(window.fetch).toHaveBeenCalledWith("/students/123");
});
