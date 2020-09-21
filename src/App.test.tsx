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

beforeAll(() => jest.spyOn(window, "fetch"));

test("Renders app without crashing", () => {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});

<<<<<<< HEAD
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
=======
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
>>>>>>> 0d67741f01d38a3c20bcf2565efe68b325f7a7e2
});
