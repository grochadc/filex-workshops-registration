import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { MAKE_RESERVATION } from "../queries";

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
