import React from "react";
import apolloMock from "../testutils/generatedMocks";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Switch, Route, MemoryRouter } from "react-router-dom";
import StudentProfile, { getStudentProfile } from "./StudentProfilePage";

export default {
  title: "Pages/StudentProfile",
  component: StudentProfile,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/student/1234567890"]}>
        <Switch>
          <Route path="/student/:codigo">
            <Story />
          </Route>
        </Switch>
      </MemoryRouter>
    ),
  ],
} as ComponentMeta<typeof StudentProfile>;

const Template: ComponentStory<typeof StudentProfile> = (args) => (
  <StudentProfile />
);

const baseStudent = {
  nombre: "Benito Antonio",
  apellido_paterno: "Martinez",
  apellido_materno: "Ocasio",
  codigo: "1234567890",
  email: "bad@bunny.pr",
  telefono: "3411234567",
  nivel: "4",
};

export const withReservationMock = apolloMock(
  getStudentProfile,
  { code: "1234567890" },
  {
    data: {
      student: {
        ...baseStudent,
        reservation: {
          workshop_name: "Conversation",
          teacher_name: "Gonzalo",
          day: "Martes",
          time: "13:00 - 14:00",
        },
        reservationCount: 4,
        reservationLimit: 6,
      },
    },
  }
);
export const Normal = Template.bind({});
Normal.parameters = {
  apolloClient: {
    mocks: [withReservationMock],
  },
};

const withoutResMock = apolloMock(
  getStudentProfile,
  { code: "1234567890" },
  {
    data: {
      student: {
        ...baseStudent,
        reservationCount: 4,
        reservationLimit: 6,
      },
    },
  }
);
export const WithoutRes = Template.bind({});
WithoutRes.parameters = {
  apolloClient: {
    mocks: [withoutResMock],
  },
};

const resLimitMock = apolloMock(
  getStudentProfile,
  { code: "1234567890" },
  {
    data: {
      student: {
        ...baseStudent,
        reservationCount: 6,
        reservationLimit: 6,
      },
    },
  }
);

export const ReservationsLimit = Template.bind({});
ReservationsLimit.parameters = {
  apolloClient: {
    mocks: [resLimitMock],
  },
};

const withResLimitMock = apolloMock(
  getStudentProfile,
  { code: "1234567890" },
  {
    data: {
      student: {
        ...baseStudent,
        reservation: {},
        reservationCount: 6,
        reservationLimit: 6,
      },
    },
  }
);

export const WithReservationLimited = Template.bind({});
WithReservationLimited.parameters = {
  apolloClient: {
    mocks: [withResLimitMock],
  },
};
