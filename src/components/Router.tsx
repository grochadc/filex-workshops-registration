import React, { Fragment } from "react";

type RouterProps = {
  currentRoute: string;
  render: any;
};

const Router = ({ currentRoute, render }: RouterProps) => {
  return <>{render(currentRoute)}</>;
};

type RouterViewProps = {
  route: string;
  currentRoute: string;
  children: React.ReactNode;
};

Router.View = ({ route, currentRoute, children }: RouterViewProps) => (
  <div>{currentRoute === route ? <Fragment>{children}</Fragment> : null}</div>
);

export default Router;
