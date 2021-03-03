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
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <p>Reservación realizada con exito!</p>
      <p>ID de Reservacion: {data && data.makeWorkshopReservation.id}</p>
      <p>Codigo: {data && data.makeWorkshopReservation.codigo}</p>
      <p>Nombre: {data && data.makeWorkshopReservation.nombre}</p>
      <p>Hora: {data && data.makeWorkshopReservation.timestamp}</p>
      <p>
        URL del taller:{" "}
        <a href={data && data.makeWorkshopReservation.url}>
          {data && data.makeWorkshopReservation.url}
        </a>
      </p>
      {data && data.makeWorkshopReservation.zoom_id && (
        <p>Zoom ID: {data.makeWorkshopReservation.zoom_id}</p>
      )}
    </div>
  );
};

export default Success;
