import React, { useEffect, Dispatch, useCallback } from "react";
import { gql } from "@apollo/client";
import { useParams, useHistory } from "react-router-dom";
import {
  useGetSelectionInfoQuery,
  useSetReservationMutation,
} from "../generated/grapqhl";
import { Loading, Error } from "../components/utils";
import Selection from "../components/Selection";

export const GET_SELECTION_INFO = gql`
  query getSelectionInfo($code: ID!) {
    isWorkshopsOpen
    student(codigo: $code) {
      id
      codigo
      nombre
      nivel
      reservation {
        workshop_name
        day
        time
        teacher_name
        url
        zoom_id
      }
    }
    workshops {
      id
      name
      description
      levels
      options {
        id
        workshop_id
        workshop_name
        day
        time
        teacher_name
        teacher_id
        url
        zoom_id
        isTutorial
        available
      }
    }
  }
`;

export const MAKE_RESERVATION = gql`
  mutation setReservation(
    $student_id: ID!
    $option_id: ID!
    $tutorial_reason: String
  ) {
    makeWorkshopReservation(
      student_id: $student_id
      option_id: $option_id
      tutorial_reason: $tutorial_reason
    ) {
      day
      time
      teacher_name
      workshop_name
      url
      zoom_id
    }
  }
`;

type SelectionPageProps = {
  setReservationDetails: Dispatch<any>;
};
const SelectionPage = (props: SelectionPageProps) => {
  const history = useHistory();
  const handleDetails = useCallback(
    (details: any) => {
      props.setReservationDetails(details);
      history.push("/details");
    },
    [history, props]
  );
  const params: { code: string } = useParams();
  const [
    saveReservation,
    { error: saveReservationError },
  ] = useSetReservationMutation({
    onCompleted: (data) => {
      handleDetails(data.makeWorkshopReservation);
    },
  });
  const handleReservation = (option_id: string, tutorial_reason?: string) => {
    saveReservation({
      variables: {
        student_id: data ? data.student.id : "",
        option_id,
        tutorial_reason: tutorial_reason ? tutorial_reason : null,
      },
    });
  };
  const { data, loading, error } = useGetSelectionInfoQuery({
    variables: { code: params.code },
  });
  useEffect(() => {
    if (data?.student.reservation) {
      handleDetails(data.student.reservation);
    }
  }, [data, handleDetails]);
  if (
    saveReservationError?.graphQLErrors[0].extensions?.code ===
    "RESERVATION_FORBIDDEN"
  ) {
    history.push(`/selection/${data?.student.codigo}`);
  }
  if (error) return <Error e={error} />;
  if (loading) return <Loading />;
  if (data) {
    if (!data.isWorkshopsOpen)
      return (
        <h2>
          El horario para registro de talleres es Viernes a partir de las 11:00
          am
        </h2>
      );
    return (
      <Selection
        student={data.student}
        workshops={data.workshops}
        onReservation={handleReservation}
      />
    );
  }
  return <div />;
};

export default SelectionPage;
