import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import { MemoryRouter as Router } from "react-router-dom";

import Nav from "./Nav";

export default {
  title: "Components/Nav",
  component: Nav,
  decorators: [
    (Story) => (
      <>
        <Jumbotron className="m-0">
          <h1 className="font-bold text-3xl">FILEX WORKSHOPS</h1>
        </Jumbotron>
        <Story />
      </>
    ),
    (Story) => (
      <Router>
        <Story />
      </Router>
    ),
  ],
} as ComponentMeta<typeof Nav>;

const Template: ComponentStory<typeof Nav> = (args) => <Nav {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  student: {
    codigo: "1234567890",
    nombre: "Benito Antonio",
  },
};
