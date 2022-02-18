import { ComponentMeta } from "@storybook/react";

import React from "react";
import { CodeForm } from "./Home";

export default {
  title: "Components/CodeForm",
  component: CodeForm,
} as ComponentMeta<typeof CodeForm>;

const Template = (args) => <CodeForm {...args} />;

export const Normal = Template.bind({});
