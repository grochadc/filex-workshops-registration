//@ts-ignore
import React from "react";
import { screen, act } from "@testing-library/react";
import { within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "./testutils";
import { Switch, Route } from "react-router-dom";
import App from "./App";

import {
  withoutResMock,
  selectionInfoOpenMock,
  setReservationMock,
} from "./App.stories";

const waitForServer = async () => {
  return act(
    async () => await new Promise((resolve) => setTimeout(resolve, 0))
  );
};

test("makes a reservation successfully", async () => {
  renderWithProviders(<App />, {
    mocks: [withoutResMock, selectionInfoOpenMock, setReservationMock],
  });

  userEvent.type(screen.getByRole("textbox"), "1234567890");
  userEvent.click(screen.getByRole("button"));
  await waitForServer();

  const resButton = await screen.findByRole("button", {
    name: /hacer una reservacion/i,
  });

  userEvent.click(resButton);

  await waitForServer();

  userEvent.click(screen.getByTestId("button-reservar-option_id1"));
  await waitForServer();

  userEvent.click(screen.getByTestId("modal-reservar-button"));
  await waitForServer();

  expect(screen.getByText(/detalles de tu/i)).toBeInTheDocument();
  expect(screen.getByText(/conversation/i)).toBeInTheDocument();
  expect(screen.getByText(/fulanito/i)).toBeInTheDocument();
  expect(screen.getByText(/lunes/i)).toBeInTheDocument();
});

test("changes a workshop selection", async () => {
  renderWithProviders(
    <Switch>
      <Route path="/selection/:code">
        <App />
      </Route>
    </Switch>,
    {
      mocks: [selectionInfoOpenMock],
      route: "/selection/1234567890",
    }
  );
  await waitForServer();

  userEvent.click(
    screen.getByRole("button", {
      name: /conversation/i,
    })
  );

  userEvent.click(screen.getByText(/reservar/i));

  const modalNode = screen.getByRole("dialog");
  expect(modalNode).toBeInTheDocument(); //modal is open
  const insideModal = within(modalNode);
  expect(insideModal.getByText(/gonzalo/i)).toBeInTheDocument();
  userEvent.click(insideModal.getByRole("button", { name: "Cancelar" }));

  expect(screen.getByRole("dialog")).not.toHaveClass("show"); //modal is closed
});
