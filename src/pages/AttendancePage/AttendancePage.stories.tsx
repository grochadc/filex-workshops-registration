import React from "react";
import AttendancePage, { fetchTeacherWorkshops } from ".";
import { fetchReservationsByOptionId } from "../../connected/components/OptionAttendanceTable";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import apolloMock from "../../testutils/generatedMocks";
import { MemoryRouter as Router, Switch, Route } from "react-router-dom";

const fetchTeacherWorkshopsMock = apolloMock(
  fetchTeacherWorkshops,
  { teacher_id: "t_2" },
  {
    data: {
      teacher: {
        nombre: "Gonzalo Rocha",
        options: [
          {
            id: "opt_3",
            day: "Lunes",
            time: "11:00",
            workshop: { name: "Conversation" },
          },
          { id: "opt_2", day: "Miercoles", time: "13:00" },
          { id: "opt_3", day: "Jueves", time: "12:00" },
        ],
      },
    },
  }
);

const fetchReservationsByOptionIdMock = apolloMock(
  fetchReservationsByOptionId,
  { optionId: "opt_3" },
  {
    data: {
      reservations: [{ id: "res_1" }, { id: "res_2" }],
    },
  }
);

const fetchReservationsByOptionIdEmptyMock = apolloMock(
  fetchReservationsByOptionId,
  { optionId: "opt_2" },
  {}
);

export default {
  title: "Pages/Attendance",
  component: AttendancePage,
  parameters: {
    apolloClient: {
      mocks: [fetchTeacherWorkshopsMock, fetchReservationsByOptionIdMock, fetchReservationsByOptionIdEmptyMock],
    },
  },
  decorators: [
    (Story) => (
      <Router initialEntries={["/attendance/t_2"]}>
        <Switch>
          <Route path="/attendance/:teacherId">
            <Story />
          </Route>
        </Switch>
      </Router>
    ),
  ],
} as ComponentMeta<typeof AttendancePage>;

const Template: ComponentStory<typeof AttendancePage> = (args) => (
  <AttendancePage />
);

export const Normal = Template.bind({});
