import React from "react";
import apolloMock from "../testutils/generatedMocks";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { MemoryRouter as Router } from "react-router-dom";

import Dashboard, { getSettings } from "./DashboardPage";

const settingsMock = apolloMock(
  getSettings,
  {},
  {
    data: {
      teachers: [
        { id: "1", name: "Erika" },
        { id: "2", name: "Gissel" },
        { id: "3", name: "Sergio" },
        { id: "4", name: "Gonzalo" },
        { id: "5", name: "Carlos" },
        { id: "6", name: "Jessica" },
        { id: "7", name: "Brenda" },
        { id: "8", name: "Felipe" },
      ],
    },
  }
);
export default {
  title: "Pages/Dashboard",
  component: Dashboard,
  parameters: {
    apolloClient: {
      mocks: [settingsMock],
    },
  },
  decorators: [
    (Story) => (
      <Router>
        <Story />
      </Router>
    ),
  ],
} as ComponentMeta<typeof Dashboard>;

const Template: ComponentStory<typeof Dashboard> = (args) => (
  <Dashboard {...args} />
);

export const Normal = Template.bind({});
