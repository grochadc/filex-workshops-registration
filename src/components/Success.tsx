import React, { useEffect } from "react";
import { gql, useMutation } from "@apollo/client";

const MAKE_RESERVATION = gql`
  mutation setReservation(
    $code: String!
    $name: String!
    $option_id: String!
    $workshop_id: String!
  ) {
    makeReservation(
      code: $code
      name: $name
      option_id: $option_id
      workshop_id: $workshop_id
    ) {
      id
      timestamp
      code
      name
      option_id
    }
  }
`;

type WorkshopSelection = {
  code: string;
  name: string;
  workshop_id: string;
  option_id: string;
};

type SuccessProps = {
  reservation: WorkshopSelection | undefined;
};

const Success: React.FC<SuccessProps> = ({ reservation }) => {
  const variables = reservation && {
    code: reservation.code,
    name: reservation.name,
    option_id: reservation.option_id,
    workshop_id: reservation.workshop_id,
  };
  const [addReservation, { data, loading, error }] = useMutation(
    MAKE_RESERVATION
  );
  useEffect(() => {
    addReservation({ variables });
    // eslint-disable-next-line
  }, []);
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <p>Reservación relaizada con exito!</p>
      <p>ID de Reservacion: {data && data.makeReservation.id}</p>
      <p>Codigo: {data && data.makeReservation.code}</p>
      <p>Nombre: {data && data.makeReservation.name}</p>
      <p>Hora: {data && data.makeReservation.timestamp}</p>
    </div>
  );
};

export default Success;