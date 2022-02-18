import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { MockedProvider } from "@apollo/client/testing";
import { createMemoryHistory } from "history";

const AllProviders = ({
  children,
  mocks,
  route,
  history,
}: {
  children: any;
  mocks: any[];
  route?: string;
  history?: any;
}) => {
  const defaultRoute = route ? route : "/";
  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter
        initialEntries={[defaultRoute]}
        //@ts-ignore
        history={history}
      >
        {children}
      </MemoryRouter>
    </MockedProvider>
  );
};

export const renderWithProviders = (
  ui: React.ReactElement,
  { mocks, route }: { mocks: any[]; route?: string }
) => {
  render(ui, {
    wrapper: (props: any) => (
      <AllProviders {...props} mocks={mocks} route={route} />
    ),
  });
};
