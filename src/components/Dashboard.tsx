import * as React from "react";
import { useMutation, gql } from "@apollo/client";

const Dashboard = () => {
  const [resetReservations] = useMutation(RESET_RESERVATIONS, {
    onCompleted: () => alert("Platform reset successful."),
  });
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => resetReservations()}>
        Erase all reservations
      </button>
    </div>
  );
};

const RESET_RESERVATIONS = gql`
  mutation reset {
    resetReservations
  }
`;

export default Dashboard;
