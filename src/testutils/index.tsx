import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { MockedProvider } from "@apollo/client/testing";

const AllProviders = ({
  children,
  mocks,
  route,
}: {
  children: any;
  mocks: Mock[];
  route?: string;
}) => {
  const defaultRoute = route ? route : "/";
  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={[defaultRoute]}>{children}</MemoryRouter>
    </MockedProvider>
  );
};

export const renderWithProviders = (
  ui: React.ReactElement,
  { mocks, route }: { mocks: Mock[]; route?: string }
) => {
  render(ui, {
    wrapper: (props: any) => (
      <AllProviders {...props} mocks={mocks} route={route} />
    ),
  });
};
