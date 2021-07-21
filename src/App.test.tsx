import React from "react";
import { screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "./testutils";
import { GET_STUDENT, MAKE_RESERVATION } from "./queries";
import App from "./App";

test("makes a reservation successfully", async () => {
  renderWithProviders(<App />, {
    mocks: [getStudentMock, makeReservationMock],
  });

  userEvent.type(screen.getByRole("textbox"), "1234567890");
  userEvent.click(screen.getByRole("button"));
  await act(async () => await new Promise((resolve) => setTimeout(resolve, 0)));

  userEvent.click(
    screen.getByRole("button", {
      name: /conversation/i,
    })
  );
  userEvent.click(screen.getByTestId("button-reservar-brendalunes"));
  await act(async () => await new Promise((resolve) => setTimeout(resolve, 0)));

  expect(screen.getByText(/seleccionaste la opcion/i)).toBeInTheDocument();
  userEvent.click(screen.getByTestId("modal-reservar-button"));
  await act(async () => await new Promise((resolve) => setTimeout(resolve, 0)));

  expect(screen.getByText(/exito/i)).toBeInTheDocument();
  expect(screen.getByText("brenda")).toBeInTheDocument();
  expect(screen.getByText(/lunes/i)).toBeInTheDocument();
  expect(screen.getByTestId("reservation-anchor")).toHaveAttribute(
    "href",
    "https://meet.google.com/lookup/brendaconversation"
  );
});

const getStudentMock: Mock = {
  request: { query: GET_STUDENT, variables: { code: "1234567890" } },
  result: {
    data: {
      student: {
        codigo: "1234567890",
        nombre: "BENITO ANTONIO",
        nivel: "4",
      },
      studentReservation: null,
      workshops: [
        {
          name: "Conversation",
          description:
            "El alumno se expresa oralmente utilizando las funciones comunicativas y vocabulario adquirido, mejorar la fluidez, y perder el temor a hablar.",
          levels: ["1", "2", "3", "4", "5", "6"],
          options: [
            {
              id: "brendalunes",
              day: "lunes",
              time: "12:00 - 13:00",
              teacher: "Brenda",
              workshop: "Conversation",
              url:
                "https://us04web.zoom.us/j/77370162343?pwd=VFpCS2xqejF1blJvY2t4OWk1c3RtQT09",
              zoom_id: null,
              available: true,
            },
          ],
        },
      ],
    },
  },
};

const makeReservationMock: Mock = {
  request: {
    query: MAKE_RESERVATION,
    variables: { codigo: "1234567890", option_id: "brendalunes" },
  },
  result: {
    data: {
      makeWorkshopReservation: {
        id: "q1ls0b",
        timestamp: "2021-07-21T19:51:38.743Z",
        codigo: "1234567890",
        nombre: "BENITO ANTONIO",
        teacher: "brenda",
        day: "lunes",
        time: "15:00 - 16:00",
        url: "https://meet.google.com/lookup/brendaconversation",
        zoom_id: null,
        alreadyRegistered: false,
      },
    },
  },
};
