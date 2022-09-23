import React from "react";
import tw from "tailwind-styled-components";
import ReservationCounter from "../components/ReservationCounter";
import { useParams, useHistory } from "react-router-dom";
import { gql } from "@apollo/client";
import { useGetStudentProfileQuery } from "../generated/grapqhl";
import { Error, Loading, Alert } from "../components/utils";

export const getStudentProfile = gql`
  query getStudentProfile($code: ID!) {
    student(codigo: $code) {
      id
      codigo
      nombre
      apellido_paterno
      apellido_materno
      email
      telefono
      nivel
      reservation {
        id
        option {
          workshop {
            name
          }
          day
          time
          url
          teacher {
            nombre
          }
        }
      }
      reservationCount
      reservationLimit
    }
  }
`;

const Card = tw.div`
rounded-md
border
shadow
p-3
m-2
`;

const Heading = tw.h3`
font-bold
text-2xl
`;

function StudentProfile() {
  const params: { codigo: string } = useParams();
  const history = useHistory();
  const { data, loading, error } = useGetStudentProfileQuery({
    variables: { code: params.codigo },
  });

  if (loading) <Loading />;
  if (error) <Error e={error} />;
  return (
    <div className="">
      <div className="md:flex">
        <Card className="md:basis-1/2">
          <Heading className="sm:text-center md:text-left">Alumno</Heading>
          <p>
            {data?.student.nombre} {data?.student.apellido_paterno}{" "}
            {data?.student.apellido_materno}
          </p>
          <p>
            <strong>Código:</strong> {data?.student.codigo}
          </p>
          <p>
            <strong>Correo:</strong> {data?.student.email}
          </p>
          <p>
            <strong>Teléfono:</strong> {data?.student.telefono}
          </p>
          <p>
            <strong>Nivel:</strong> {data?.student.nivel}
          </p>
        </Card>
        <Card className="text-center md:basis-1/2">
          <Heading>Reservaciones</Heading>
          <div className="flex justify-center">
            <ReservationCounter
              current={data ? data.student.reservationCount : 0}
              total={data ? data.student.reservationLimit : 5}
            />
          </div>
          <p>
            Recuerda que solo puedes hacer {data?.student.reservationLimit}{" "}
            reservaciones durante el semestre.
          </p>
        </Card>
      </div>
      <Card className="text-center">
        <Heading>Reservación Actual</Heading>
        {data?.student.reservation ? (
          <>
            <p>{data?.student.reservation.option.workshop.name}</p>
            <p>Teacher {data?.student.reservation.option.teacher.nombre}</p>
            <p>
              {data?.student.reservation.option.day}{" "}
              {data?.student.reservation.option.time}
            </p>
          </>
        ) : (
          <>
            <p>No tienes una reservacion actualmente.</p>
              <p>
                <button
                  className="rounded bg-blue-500 p-2 m-1 text-white"
                  onClick={() => history.push(`/selection/${params.codigo}`)}
                >
                  Hacer una reservacion
                </button>
              </p>
          </>
        )}
      </Card>
    </div>
  );
}
export default StudentProfile;
