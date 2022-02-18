import React from "react";
import ReservationCounter from "./ReservationCounter";

//import { ComponentMeta, ComponentStory } from "@storybook";

export default {
  title: "Components/ReservationCounter",
  component: ReservationCounter,
};

export const Normal = (args) => <ReservationCounter {...args} />;

Normal.args = {
  current: 4,
  total: 6,
};
