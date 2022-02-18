import React from "react";
import { Alert } from "./index";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "Utilities/Alert",
  component: Alert,
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args) => (
  <Alert>{args.children}</Alert>
);

export const Normal = Template.bind({});
Normal.args = {
  children: "Hola Mundo",
};
