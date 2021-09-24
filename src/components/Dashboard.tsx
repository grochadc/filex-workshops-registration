import * as React from "react";
import { useMutation, gql } from "@apollo/client";
import { useSettingsQuery, useToggleMutation } from "../generated/grapqhl";
import { Error } from "./utils";
import Button from "react-bootstrap/Button";
import styled from "styled-components";

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-between;
`;

const Dashboard = () => {
  const [resetReservations] = useMutation(RESET_RESERVATIONS, {
    onCompleted: () => alert("Platform reset successful."),
  });
  const [openWorkshops] = useToggleMutation();
  const [open, setOpen] = React.useState(false);
  const { data: settingsData, error } = useSettingsQuery();
  React.useEffect(() => {
    if (settingsData) setOpen(settingsData.isWorkshopsOpen);
  }, [settingsData]);
  const handleToggleChange = () => {
    openWorkshops();
    setOpen(!open);
  };
  if (error) <Error e={error} />;
  return (
    <div>
      <h1>Dashboard</h1>
      <FlexContainer>
        <Button onClick={() => resetReservations()}>
          Erase all reservations
        </Button>
        <Button onClick={handleToggleChange}>
          {open ? "Close platform" : "Open platform"}
        </Button>
      </FlexContainer>
    </div>
  );
};

export const RESET_RESERVATIONS = gql`
  mutation reset {
    resetReservations
  }
`;

export const GET_SETTINGS = gql`
  query settings {
    isWorkshopsOpen
  }
`;

export const TOGGLE_OPEN = gql`
  mutation toggle {
    toggleOpenWorkshops
  }
`;

export default Dashboard;
