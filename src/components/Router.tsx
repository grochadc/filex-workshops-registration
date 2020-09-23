import React, { useState } from "react";

type RouterContextType = {
  contextRoute: string;
  setRoute: (route: string) => void;
};

function initFn(route) {
  return true;
}
const initialContext = {
  contextRoute: "",
  setRoute: initFn,
};

const RouterContext = React.createContext<RouterContextType>(initialContext);

type RouterProps = {
  children: React.ReactNode;
  defaultRoute: string;
};

const Router = ({ defaultRoute, children }: RouterProps) => {
  const [route, setRoute] = useState(defaultRoute);
  return (
    <RouterContext.Provider value={{ contextRoute: route, setRoute }}>
      {children}
    </RouterContext.Provider>
  );
};

type RouterViewProps = {
  route: string;
  children: React.ReactNode;
};
const useRoute = () => React.useContext(RouterContext);

const View = ({ route, children }: RouterViewProps) => {
  const { contextRoute } = useRoute();
  return <>{route === contextRoute ? children : null}</>;
};

Router.View = View;
Router.useRoute = useRoute;

export default Router;
