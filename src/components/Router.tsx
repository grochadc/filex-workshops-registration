import React from "react";

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

const View = ({ route, currentRoute, children }: RouterViewProps) => {
  return(<>{currentRoute === route ? <div>{children}</div> : null}</>)
};

Router.View = View;

export default Router;
