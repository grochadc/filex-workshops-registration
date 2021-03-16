import React from "react";
import { screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "./testutils";
import { getStudentMock, makeReservationMock } from "./testutils/mocks";
import App from "./App";

test("makes a reservation successfully", async () => {
  renderWithProviders(<App />, {
    mocks: [getStudentMock, makeReservationMock],
  });
  userEvent.type(screen.getByRole("textbox"), "1234567890");
  userEvent.click(screen.getByRole("button"));

  await act(async () => await new Promise((resolve) => setTimeout(resolve, 0)));

  const workshopButton = await screen.findByRole("button", {
    name: /conversation/i,
  });
  userEvent.click(workshopButton);

  userEvent.click(
    await screen.findByRole("button", {
      name: /reservar/i,
    })
  );

  userEvent.click(await screen.findByRole("button", { name: /reservar/i }));

  await act(async () => await new Promise((resolve) => setTimeout(resolve, 0)));

  expect(await screen.findByText(/exito/i)).toBeInTheDocument();
});
