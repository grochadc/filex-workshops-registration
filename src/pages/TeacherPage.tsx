import React from "react";
import { gql } from "@apollo/client";

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
          codigo
          nombre
          apellido_paterno
          apellido_materno
          nivel
          grupo
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
  return <div />;
};

export default TeacherPage;
