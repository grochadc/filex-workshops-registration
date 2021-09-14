import React from "react";
import { screen, act } from "@testing-library/react";
import { within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "./testutils";
import { GET_SELECTION_INFO, MAKE_RESERVATION } from "./pages/SelectionPage";
import apolloMock from "./testutils/generatedMocks";
import { Switch, Route } from "react-router-dom";
import App from "./App";

const waitForServer = async () => {
  return act(
    async () => await new Promise((resolve) => setTimeout(resolve, 0))
  );
};

const selectionInfoMock = apolloMock(
  GET_SELECTION_INFO,
  { code: "1234567890" },
  {
    data: {
      student: {
        id: "1",
        nivel: "4",
      },
      workshops: [
        {
          name: "Conversation",
          levels: ["1", "2", "3", "4", "5", "6"],
          options: [
            {
              id: "1",
              teacher_name: "Gonzalo",
              available: true,
            },
          ],
        },
      ],
    },
  }
);
const makeReservationMock = apolloMock(
  MAKE_RESERVATION,
  {
    student_id: "1",
    option_id: "1",
    tutorial_reason: null,
  },
  {
    data: {
      makeWorkshopReservation: {
        workshop_name: "Conversation",
        teacher_name: "Fulanito",
        day: "Lunes",
        time: "14:00 - 15:00",
        url: "https://meet.google.com",
      },
    },
  }
);

test("makes a reservation successfully", async () => {
  renderWithProviders(<App />, {
    mocks: [selectionInfoMock, makeReservationMock],
  });

  userEvent.type(screen.getByRole("textbox"), "1234567890");
  userEvent.click(screen.getByRole("button"));
  await waitForServer();

  userEvent.click(screen.getByText(/reservar/i));
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
      mocks: [selectionInfoMock],
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
