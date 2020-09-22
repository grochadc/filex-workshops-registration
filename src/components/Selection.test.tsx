import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import withMarkup from "../testutils/withMarkup";
import Selection from "./Selection";

test("Renders without crashing", () => {
  const { asFragment } = render(<Selection student={{ name: "Pedro" }} />);
  expect(asFragment()).toMatchSnapshot();
});

test("Shows the modal with the correct information", () => {
  render(<Selection />);
  userEvent.click(screen.getByText(/Conversation/i));
  userEvent.click(screen.getAllByText(/Teacher Alondra/i)[0]);
  const getByTextWithMarkup = withMarkup(screen.getByText);
  expect(
    getByTextWithMarkup("Horario: Lunes 13:00 - 14:00")
  ).toBeInTheDocument();
});
