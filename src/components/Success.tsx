import React, { useEffect } from "react";
import { gql, useMutation } from "@apollo/client";

const MAKE_RESERVATION = gql`
  mutation setReservation(
    $code: String!
    $name: String!
    $first_last_name: String!
    $second_last_name: String!
    $level: Int!
    $group: String!
    $option_id: String!
  ) {
    makeReservation(
      input: {
        code: $code
        name: $name
        first_last_name: $first_last_name
        second_last_name: $second_last_name
        level: $level
        group: $group
        option_id: $option_id
      }
    ) {
      id
      timestamp
      code
      name
      option_id
      url
      zoom_id
    }
  }
`;

type SuccessProps = {
  reservation: Reservation | undefined;
};

const Success: React.FC<SuccessProps> = (props) => {
  const [addReservation, { data, loading, error }] = useMutation(
    MAKE_RESERVATION
  );
  useEffect(() => {
    addReservation({ variables: props.reservation }).catch((error) => {
      console.log(error);
    });
    // eslint-disable-next-line
  }, []);
  if (error)
    return <p>Error: {JSON.stringify(error.graphQLErrors[0].message)}</p>;
  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <p>Reservación realizada con exito!</p>
      <p>ID de Reservacion: {data && data.makeReservation.id}</p>
      <p>Codigo: {data && data.makeReservation.code}</p>
      <p>Nombre: {data && data.makeReservation.name}</p>
      <p>Hora: {data && data.makeReservation.timestamp}</p>
      <p>
        URL del taller:{" "}
        <a href={data && data.makeReservation.url}>
          {data && data.makeReservation.url}
        </a>
      </p>
      {data && data.makeReservation.zoom_id && (
        <p>Zoom ID: {data.makeReservation.zoom_id}</p>
      )}
    </div>
  );
};

export default Success;
