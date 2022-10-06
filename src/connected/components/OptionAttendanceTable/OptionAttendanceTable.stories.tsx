import { ComponentStory, ComponentMeta } from "@storybook/react";

import apolloMock from "../../../testutils/generatedMocks";

import React from "react";

import OptionAttendanceTable, { fetchReservationsByOptionId } from ".";

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
  { optionId: "opt_4" },
  {}
)

export default {
  title: "Connected/OptionAttendanceTable",
  component: OptionAttendanceTable,
  parameters: {
    apolloClient: {
      mocks: [fetchReservationsByOptionIdMock, fetchReservationsByOptionIdEmptyMock],
    },
    argTypes: {
      onSubmit: { action: "submitted" },
    },
  },
} as ComponentMeta<typeof OptionAttendanceTable>;

const Template: ComponentStory<typeof OptionAttendanceTable> = (args) => {
  return <OptionAttendanceTable {...args} />;
};

export const Normal = Template.bind({});
Normal.args = {
  optionId: "opt_3",
};

export const Empty = Template.bind({})
Empty.args = {
  optionId: "opt_4"
}
