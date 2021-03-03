import { gql } from "@apollo/client";

export const GET_RESERVATIONS = gql`
  query reservationsList($teacher: ID!) {
    teacher(id: $teacher) {
      name
      options {
        time
        day
        workshop
      }
      reservations {
        code
        name
        first_last_name
        second_last_name
        level
        group
        timestamp
        option {
          day
        }
      }
    }
  }
`;

export const SAVE_ATTENDANCE = gql`
  mutation saveAttendance($students: [AttendanceInput]) {
    saveAttendance(input: $students) {
      status
      message
      error
    }
  }
`;

export const GET_STUDENT = gql`
  query getSelectionInfo($code: String!) {
    student(code: $code) {
      codigo
      nombre
      apellido_paterno
      apellido_materno
      nivel
      grupo
    }
    workshops {
      name
      description
      levels
      options {
        id
        day
        time
        teacher
        workshop
        url
        zoom_id
        available
      }
    }
  }
`;

export const MAKE_RESERVATION = gql`
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
