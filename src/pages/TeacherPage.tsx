import React from "react";
import * as yup from "yup";
import { gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Loading, Error } from "../components/utils";
import Accordion from "react-bootstrap/Accordion";
import Container from "react-bootstrap/Container";
import {
  useReservationsListQuery,
  useSaveAttendanceMutation,
  useSaveWorkshopUrlMutation,
  AttendingStudent,
} from "../generated/grapqhl";
import AttendanceTable from "../components/AttendanceTable";
import LinksEditor from "../components/LinksEditor";

export const GET_RESERVATIONS = gql`
  query reservationsList($teacher_id: ID!) {
    teacher(id: $teacher_id) {
      id
      name
      options(sorted: true) {
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

  const onCompletedSaveAttendance = () => {
    alert("Saved Attendance correctly!");
  };
  const [
    saveAttendance,
    { error: saveAttendanceError },
  ] = useSaveAttendanceMutation({ onCompleted: onCompletedSaveAttendance });

  const onCompletedSaveWorkshopUrlMutation = () => {
    alert("Saved url correctly!");
  };
  const [
    saveWorkshopUrlMutation,
    { error: saveWorkshopUrlMutationError },
  ] = useSaveWorkshopUrlMutation({
    onCompleted: onCompletedSaveWorkshopUrlMutation,
  });

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
  if (error || saveWorkshopUrlMutationError) return <Error e={error} />;
  if (data)
    return (
      <Container>
        <h1>Teacher {data?.teacher.name}'s Dashboard</h1>
        <Accordion>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            {data?.teacher.options.map((option, index) => {
              return (
                <AttendanceTable
                  index={index}
                  day={option.day}
                  time={option.time}
                  url={option.url}
                  reservations={option.reservations}
                  workshop_id={option.workshop_id}
                  workshop_name={option.workshop_name}
                  option_id={option.id}
                  teacher_id={data?.teacher.id}
                  teacher_name={data?.teacher.name}
                  onSaveAttendance={handleSaveAttendance}
                />
              );
            })}
          </div>
        </Accordion>
        <LinksEditor
          options={data.teacher.options}
          saveLinkOnServer={(variables) =>
            saveWorkshopUrlMutation({ variables })
          }
        />
      </Container>
    );
  return <div />;
};

export default TeacherPage;
