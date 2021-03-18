import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useModal } from "../hooks";
import { useQuery, useMutation, gql } from "@apollo/client";

type SelectionForModal = {
  workshop: string;
  teacher: string;
  day: string;
  time: string;
};

type SelectionProps = {
  setReservation: React.Dispatch<any>;
};
const Selection: React.FC<SelectionProps> = (props) => {
  const params: { code: string } = useParams();
  const history = useHistory();
  const { data, loading, error } = useQuery(GET_STUDENT, {
    variables: { code: params.code },
  });
  const [makeReservationMutation] = useMutation(MAKE_RESERVATION, {
    onCompleted: (data) => {
      props.setReservation(data);
    },
  });
  const [workshopSelection, setWorkshopSelection] = useState<Selected>({
    codigo: "",
    option_id: "",
  });
  const [selectionForModal, setSelectionForModal] = useState<
    SelectionForModal | undefined
  >(undefined);
  const { showModal, handleCloseModal, handleShowModal } = useModal();
  const handleWorkshopSelection = (selection: Selected) => {
    setWorkshopSelection(selection);
    const options = data.workshops
      .map((workshop: Workshop) => workshop.options)
      .flat();
    const selectedOption = options.filter(
      (option: Option) => option.id === selection.option_id
    )[0];
    setSelectionForModal({
      workshop: selectedOption.workshop,
      teacher: selectedOption.teacher,
      day: selectedOption.day,
      time: selectedOption.time,
    });
    handleShowModal();
  };
  const handleSubmit = ({ codigo, option_id }: Selected) => {
    makeReservationMutation({ variables: { codigo, option_id } });
    history.push("/success");
  };

  if (error)
    return (
      <p>
        <h1>This is the code {params.code}</h1>Error: {JSON.stringify(error)}
      </p>
    );
  if (loading) return <p>Loading...</p>;
  return (
    <Container>
      <div>
        <>Hola {data.student.nombre}!</>
        {data.workshops
          .filter(({ levels }: { levels: number[] }) =>
            levels.includes(data.student.nivel)
          )
          .map((workshop: Workshop, workshopIndex: number) => {
            const eventKey = workshopIndex.toString();
            return (
              <Accordion key={workshopIndex}>
                <Card className="text-center p-3">
                  <Accordion.Toggle eventKey={eventKey} as={Button}>
                    {workshop.name}
                  </Accordion.Toggle>
                  {workshop.description}
                </Card>
                <Accordion.Collapse eventKey={eventKey}>
                  <Container>
                    <Row>
                      {workshop.options.map((option, optionIndex) => {
                        return (
                          <Col className="mb-3" key={optionIndex}>
                            <Card
                              as="a"
                              style={optionCardStyles}
                              className="text-center pt-3"
                            >
                              <Card.Title
                                className={option.available ? "" : "text-muted"}
                              >
                                Teacher {capitalizeString(option.teacher)}
                              </Card.Title>
                              <Card.Subtitle
                                className={option.available ? "" : "text-muted"}
                              >
                                {capitalizeString(option.day)}
                              </Card.Subtitle>
                              <Card.Body
                                className={option.available ? "" : "text-muted"}
                              >
                                {option.time}
                                {option.available ? (
                                  <p>
                                    <Button
                                      onClick={() => {
                                        const workshopSelection: Selected = {
                                          codigo: data.student.codigo,
                                          option_id: option.id,
                                        };
                                        handleWorkshopSelection(
                                          workshopSelection
                                        );
                                      }}
                                    >
                                      Reservar
                                    </Button>
                                  </p>
                                ) : (
                                  <Alert variant="danger">
                                    Lugares no disponibles
                                  </Alert>
                                )}
                              </Card.Body>
                            </Card>
                          </Col>
                        );
                      })}
                    </Row>
                  </Container>
                </Accordion.Collapse>
              </Accordion>
            );
          })}
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Seleccionaste la opcion:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectionForModal ? (
            <>
              <p>
                <strong>Taller:</strong>{" "}
                <em>{capitalizeString(selectionForModal.workshop)}</em>
              </p>
              <p>
                <strong>Teacher:</strong>{" "}
                <em>{capitalizeString(selectionForModal.teacher)}</em>
              </p>
              <p>
                <strong>Horario:</strong> <em>{selectionForModal.time}</em>
              </p>
              <p>
                <strong>Dia:</strong>{" "}
                <em>{capitalizeString(selectionForModal.day)}</em>
              </p>
            </>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={() => handleSubmit(workshopSelection)}
          >
            Reservar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export const GET_STUDENT = gql`
  query getSelectionInfo($code: ID!) {
    student(codigo: $code) {
      codigo
      nombre
      nivel
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
  mutation setReservation($codigo: ID!, $option_id: ID!) {
    makeWorkshopReservation(input: { codigo: $codigo, option_id: $option_id }) {
      id
      timestamp
      codigo
      nombre
      url
      zoom_id
      alreadyRegistered
    }
  }
`;

const optionCardStyles = {
  width: "18rem",
  cursor: "pointer",
  color: "black",
  textDecoration: "none",
};

const capitalizeString = (str: string) => {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
};

export default Selection;
