import React, { useEffect, Dispatch, useCallback } from "react";
import { gql } from "@apollo/client";
import { useParams, useHistory } from "react-router-dom";
import {
  useGetSelectionInfoQuery,
  useSetReservationMutation,
} from "../generated/grapqhl";
import { Loading, Error } from "../components/utils";
import Selection from "../components/Selection";

export const getSelectionInfo = gql`
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
        available
        active
        isTutorial
      }
    }
  }
`;

export const MAKE_RESERVATION = gql`
  mutation setReservation($student_id: ID!, $option_id: ID!) {
    makeWorkshopReservation(student_id: $student_id, option_id: $option_id) {
      day
      time
      teacher_name
      workshop_name
      url
    }
  }
`;

export const IsWorkshopsOpenContext = React.createContext(false);

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
  const [saveReservation, { error: saveReservationError }] =
    useSetReservationMutation({
      onCompleted: (data) => {
        handleDetails(data.makeWorkshopReservation);
      },
    });
  const handleReservation = (option_id: string) => {
    saveReservation({
      variables: {
        student_id: data ? data.student.id : "",
        option_id,
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
    saveReservationError?.graphQLErrors[0]?.extensions?.code ===
    "RESERVATION_FORBIDDEN"
  ) {
    history.push(`/selection/${data?.student.codigo}`);
  }

  if (error) return <Error e={error} />;
  if (loading) return <Loading />;
  if (data) {
    return (
      <IsWorkshopsOpenContext.Provider value={data?.isWorkshopsOpen}>
        <Selection
          /*
        //@ts-ignore */
          student={data.student}
          workshops={data.workshops}
          onReservation={handleReservation}
          isWorkshopsOpen={data.isWorkshopsOpen}
        />
      </IsWorkshopsOpenContext.Provider>
    );
  }
  return <div />;
};

export default SelectionPage;
