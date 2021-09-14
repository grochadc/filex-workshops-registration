import React from "react";
import apolloMock from "../testutils/generatedMocks";
import Jumbotron from "react-bootstrap/Jumbotron";
import { MemoryRouter, Route } from "react-router-dom";
import SelectionPage, {
  GET_SELECTION_INFO,
  MAKE_RESERVATION,
} from "../pages/SelectionPage";
//import { selectionInfoMock, makeReservationMock } from "../App.test";
const selectionInfoMock = apolloMock(
  GET_SELECTION_INFO,
  { code: "1234567890" },
  {
    data: {
      student: {
        nivel: "4",
      },
      workshops: [
        {
          name: "Conversation",
          levels: ["1", "2", "3", "4", "5", "6"],
          options: [
            {
              id: "option_id1",
              teacher_id: "teacher_id1",
              teacher_name: "Gonzalo",
              available: true,
            },
          ],
        },
        {
          name: "Tutorials",
          levels: ["1", "2", "3", "4", "5", "6"],
          options: [
            {
              id: "option_id2",
              teacher_id: "teacher_id1",
              teacher_name: "Gonzalo",
              isTutorial: true,
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
    codigo: "1234567890",
    option_id: "option_id1",
    teacher_id: "teacher_id1",
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
export default {
  title: "Selection Page Story",
  component: SelectionPage,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/selection/1234567890"]}>
        <Jumbotron>
          <h1>FILEX WORKSHOPS</h1>
        </Jumbotron>
        <Route path="/selection/:code">
          <Story />
        </Route>
      </MemoryRouter>
    ),
  ],
};

export const Example = () => (
  <SelectionPage setReservationDetails={console.log} />
);

Example.parameters = {
  apolloClient: {
    mocks: [selectionInfoMock, makeReservationMock],
  },
};
