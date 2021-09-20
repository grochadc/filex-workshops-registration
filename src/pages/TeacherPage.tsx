import React, { useEffect } from "react";
import * as yup from "yup";
import { gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Loading, Error } from "../components/utils";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import {
  useReservationsListQuery,
  useSaveAttendanceMutation,
  AttendingStudent,
} from "../generated/grapqhl";
import AttendanceTable from "../components/AttendanceTable";

export const GET_RESERVATIONS = gql`
  query reservationsList($teacher_id: ID!) {
    teacher(id: $teacher_id) {
      id
      name
      options {
        id
        day
        time
        url
        workshop_name
        workshop_id
        reservations {
          id
          codigo
          nombre
          apellido_paterno
          apellido_materno
          email
          telefono
          nivel
          grupo
          tutorial_reason
        }
      }
    }
  }
`;
export const SAVE_ATTENDANCE = gql`
  mutation saveAttendance(
    $students: [AttendingStudent!]!
    $option_id: ID!
    $teacher_id: ID!
  ) {
    saveWorkshopsAttendance(
      input: $students
      option_id: $option_id
      teacher_id: $teacher_id
    )
  }
`;
function validateAttendance(students: AttendingStudent[]) {
  const attendingStudentSchema = yup
    .array()
    .of(
      yup
        .object()
        .shape({
          apellido_materno: yup.string().defined(),
          apellido_paterno: yup.string().defined(),
          attended: yup.boolean().defined(),
          codigo: yup.string().defined(),
          grupo: yup.string().defined(),
          nivel: yup.string().defined(),
          nombre: yup.string().defined(),
          teacher: yup.string().defined(),
          workshop: yup.string().defined(),
        })
        .noUnknown()
        .defined()
    )
    .defined();
  return attendingStudentSchema.validateSync(students);
}

export const SAVE_WORKSHOP_URL = gql`
  mutation saveWorkshopUrl($option_id: ID!, $link: String!) {
    setWorkshopLink(option_id: $option_id, url: $link)
  }
`;

const TeacherPage = () => {
  const params: { id: string } = useParams();
  const { data, loading, error } = useReservationsListQuery({
    variables: { teacher_id: params.id },
  });
  const [
    saveAttendance,
    { data: saveAttendanceData, error: saveAttendanceError },
  ] = useSaveAttendanceMutation();

  useEffect(() => {
    if (saveAttendanceData) alert("Saved attendance successfully");
  }, [saveAttendanceData]);

  const handleSaveAttendance = ({
    attendance,
    option_id,
  }: {
    attendance: AttendingStudent[];
    option_id: string;
  }) => {
    const validAttendance = validateAttendance(attendance);

    saveAttendance({
      variables: {
        option_id,
        teacher_id: data ? data.teacher.id : "0",
        students: validAttendance,
      },
    }).catch((e) => console.error(e));
  };

  if (saveAttendanceError) return <Error e={saveAttendanceError} />;
  if (loading) return <Loading />;
  if (error) return <Error e={error} />;
  return (
    <Container>
      <h1>Teacher {data?.teacher.name}'s Dashboard</h1>
      <Accordion>
        {data?.teacher.options.map((option, index) => {
          const eventKey = index.toString();
          return (
            <div key={option.id}>
              <Accordion.Toggle eventKey={eventKey} as={Card}>
                <Card.Body>
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <div>
                      <h4>{option.workshop_name}</h4>
                      <h5>
                        {option.day} {option.time}
                      </h5>
                      <p>
                        Link: <a href={option.url}>{option.url}</a>
                      </p>
                    </div>
                    <div>Click para Abrir/Cerrar</div>
                  </div>
                </Card.Body>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={eventKey}>
                <AttendanceTable
                  reservations={option.reservations}
                  workshop_id={option.workshop_id}
                  option_id={option.id}
                  onSaveAttendance={handleSaveAttendance}
                  teacher={data?.teacher.name}
                  workshop={option.workshop_name}
                />
              </Accordion.Collapse>
            </div>
          );
        })}
      </Accordion>
    </Container>
  );
};

export default TeacherPage;
