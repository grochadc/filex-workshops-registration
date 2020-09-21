import React, { Fragment } from "react";
import { render, screen, act, waitFor, cleanup, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import MutationObserver from "mutation-observer";
window.MutationObserver = MutationObserver;

afterEach(cleanup)
async function mockFetch(url, config) {
  if(url === '/students/12345') {
    return {
      ok: true,
      status: 200,
      json: async () => ({name: 'Pedro'}),
    }
  } else {
    throw new Error(`Unhandled request: ${url}`)
  }
}

test("Renders app without crashing", () => {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});

test("Gets a code and renders student info on new route", async () => {
  const mockedFetch = jest.spyOn(window, 'fetch')
  render(<App />);
  const codeInput = screen.getByLabelText("Code:");
  userEvent.type(codeInput, "12345");
  expect(screen.getByLabelText(/Code:/i)).toHaveValue("12345");
  userEvent.click(screen.getByText(/Submit/i));
  expect(mockedFetch).toHaveBeenCalled();
  expect(await screen.findByText(/Pedro/i)).toBeInTheDocument();
  waitFor(() => expect(screen.queryByText(/Submit/i)).not.toBeInTheDocument());
});
