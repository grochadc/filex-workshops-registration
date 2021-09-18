import React, { useEffect } from "react";
import { gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Loading, Error } from "../components/utils";
import {
  useReservationsListQuery,
  useSaveAttendanceMutation,
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

  const handleSaveAttendance = ({ attendance, option_id }) => {
    const teacher_id = data ? data.teacher.id : "0";

    const currentOption = data?.teacher.options.find(
      (option) => option.id === option_id
    );

    const workshop_name = currentOption?.workshop_name;

    const composedAttendance = attendance.map(
      ({ id, tutorial_reason, ...student }) => {
        return {
          ...student,
          teacher: data?.teacher.name,
          workshop: workshop_name,
        };
      }
    );
    saveAttendance({
      variables: {
        option_id,
        teacher_id,
        students: composedAttendance,
      },
    }).catch((e) => console.error(e));
  };

  if (saveAttendanceError) return <Error e={saveAttendanceError} />;
  if (loading) return <Loading />;
  if (error) return <Error e={error} />;
  return (
    <div>
      <h1>Teacher {data?.teacher.name}'s Dashboard</h1>
      {data?.teacher.options.map((option) => {
        return (
          <div key={option.id}>
            <h4>
              {option.workshop_name} {option.day} {option.time}
            </h4>
            <p>
              Link: <a href={option.url}>{option.url}</a>
            </p>
            <AttendanceTable
              reservations={option.reservations}
              workshop_id={option.workshop_id}
              option_id={option.id}
              onSaveAttendance={handleSaveAttendance}
            />
          </div>
        );
      })}
    </div>
  );
};

export default TeacherPage;
