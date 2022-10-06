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
  ReservationsListQuery,
} from "../generated/grapqhl";
import AttendanceTable from "../components/AttendanceTable";
import LinksEditor from "../components/LinksEditor";

import produce from "immer";

export const GET_RESERVATIONS = gql`
  query reservationsList($teacher_id: ID!) {
    teacher(id: $teacher_id) {
      id
      nombre
      options {
        id
        day
        time
        url
        workshop {
          name
          id
        }
        reservations {
          id
          student {
            codigo
            nombre
            apellido_paterno
            apellido_materno
            email
            telefono
            nivel
            grupo
          }
          tutorialReason
          attended
        }
      }
    }
  }
`;

export const getReservationById = gql`
  query getReservationById($optionId: ID!) {
    reservations(optionId: $optionId) {
      id
      student {
        codigo
        nombre
        apellido_paterno
        apellido_materno
        email
        telefono
        nivel
        grupo
      }
      tutorialReason
      attended
    }
  }
`;
export const SAVE_ATTENDANCE = gql`
  mutation saveAttendance($attendingStudents: [ReservationInput!]!) {
    saveWorkshopsAttendance(attendingStudents: $attendingStudents)
  }
`;

export const SAVE_WORKSHOP_URL = gql`
  mutation saveWorkshopUrl($option_id: ID!, $link: String!) {
    setWorkshopLink(option_id: $option_id, url: $link)
  }
`;

const TeacherPage = (props: any) => {
  const params: { id: string } = useParams();
  const { data, loading, error } = useReservationsListQuery({
    variables: { teacher_id: params.id },
  });

  const [teacherLocal, dispatch] = React.useReducer( 
    produce((draft, action) => {
      switch (action.type) {
        case "append":
          const option = draft.teacher.options.find((opt) => {
            return Boolean(opt.id === action.optionId);
          });
          if(option) option.reservations = action.payload;
          break;
        case "set":
          return action.payload;
        default:
          break;
    }
  }),
  {}
);

  const onCompletedSaveAttendance = () => {
    alert("Saved Attendance correctly!");
  };
  const [saveAttendance, { error: saveAttendanceError }] =
    useSaveAttendanceMutation({ onCompleted: onCompletedSaveAttendance });

  const onCompletedSaveWorkshopUrlMutation = () => {
    alert("Saved url correctly!");
  };
  const [saveWorkshopUrlMutation, { error: saveWorkshopUrlMutationError }] =
    useSaveWorkshopUrlMutation({
      onCompleted: onCompletedSaveWorkshopUrlMutation,
    });

  const handleSaveAttendance = async ({
    attendance,
  }: {
    attendance: any[];
  }) => {
    return saveAttendance({
      variables: {
        attendingStudents: attendance,
      },
    }).catch((e) => {
      console.error(e);
    });
  };

  React.useEffect(() => {
    dispatch({type: "set", payload: data})
  }, [data])

  if (saveAttendanceError) return <Error e={saveAttendanceError} />;
  if (loading) return <Loading />;
  if (error || saveWorkshopUrlMutationError) return <Error e={error} />;
  if (teacherLocal && data) {
    return (
      <Container>
        <h1 className="text-4xl font-bold">
          Teacher {data.teacher.nombre}'s Dashboard
        </h1>
        <Accordion>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            {data.teacher.options.map((option, index) => {
              return (
                <AttendanceTable
                  key={index}
                  index={index}
                  day={option.day}
                  time={option.time}
                  url={option.url || undefined}
                  reservations={option.reservations}
                  workshop={option.workshop}
                  option_id={option.id}
                  teacher={data?.teacher}
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
  }
  return <div />;
};

export default TeacherPage;
