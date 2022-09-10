import React, { useEffect, Dispatch, useCallback } from "react";
import { gql } from "@apollo/client";
import { useParams, useHistory } from "react-router-dom";
import {
  useGetSelectionInfoQuery,
  useSetReservationMutation,
} from "../../generated/grapqhl";
import { Loading, Error } from "../../components/utils";
import Selection from "../../components/Selection";

export const getSelectionInfo = gql`
  query getSelectionInfo($code: ID!) {
    isWorkshopsOpen
    student(codigo: $code) {
      id
      codigo
      nombre
      nivel
      reservation {
        option {
          workshop {
            name
          }
          day
          time
          teacher {
            nombre
          }
          url
          isTutorial
        }
      }
    }
    workshops {
      id
      name
      description
      levels
      options {
        id
        day
        time
        teacher {
          nombre
        }
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
      option {
        day
        time
        teacher {
          nombre
        }
        workshop {
          name
        }
        url
      }
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
      history.push(`/student/${params.code}`);
    },
    [history, props]
  );

  const params: { code: string } = useParams();

  const [saveReservation, { error: saveReservationError }] =
    useSetReservationMutation({
      onCompleted: (data) => {
        history.push(`/student/${params.code}`)
      },
    });

  const handleReservation = (
    option_id: string,
    tutorial_reason?: string,
  ) => {
    saveReservation({
      variables: {
        student_id: data ? String(data.student.id) : "",
        option_id: String(option_id),
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
