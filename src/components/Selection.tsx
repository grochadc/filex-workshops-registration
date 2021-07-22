import React, { useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useQuery, useMutation, gql } from "@apollo/client";

type SelectionForModal = {
  workshop: string;
  teacher: string;
  day: string;
  time: string;
};

type SelectionProps = {
  setReservation: React.Dispatch<any>;
  setReservationDetails: React.Dispatch<any>;
};
const Selection = (props: SelectionProps) => {
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
  const [selectionForModal, setSelectionForModal] = useState<
    SelectionForModal | undefined
  >(undefined);
  const [showModal, setShowModal] = useState(false);
  const [selectionId, setSelectionId] = useState("");
  const selectWorkshop = (selectionId: string) => {
    setSelectionId(selectionId);
    const options = data.workshops
      .map((workshop: Workshop) => workshop.options)
      .flat();
    const selectedOption = options.filter(
      (option: Option) => option.id === selectionId
    )[0];
    setSelectionForModal({
      workshop: selectedOption.workshop,
      teacher: selectedOption.teacher,
      day: selectedOption.day,
      time: selectedOption.time,
    });
    setShowModal(true);
  };
  const handleReservationConfirmation = () => {
    makeReservationMutation({
      variables: { codigo: params.code, option_id: selectionId },
    });
    history.push("/success");
  };
  if (data?.studentReservation) {
    props.setReservationDetails(data.studentReservation);
  }

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
        {data.studentReservation ? (
          <Alert variant="primary">
            Ya cuentas con una reservación.{" "}
            <Link to="/details">Revisar detalles</Link>
          </Alert>
        ) : null}
        {data.workshops
          .filter(({ levels }: { levels: number[] }) =>
            levels.includes(data.student.nivel)
          )
          .map((workshop: Workshop, workshopIndex: number) => (
            <WorkshopSelector
              key={workshopIndex}
              workshop={workshop}
              index={workshopIndex}
              selectWorkshop={selectWorkshop}
              student={data.student}
            />
          ))}
      </div>
      <SelectionModal
        show={showModal}
        handleCloseModal={() => setShowModal(false)}
        handleReservationConfirmation={handleReservationConfirmation}
        selectionForModal={selectionForModal}
      />
    </Container>
  );
};

type SelectionModalProps = {
  handleCloseModal: () => void;
  handleReservationConfirmation: () => void;
  show: boolean;
  selectionForModal: SelectionForModal | undefined;
};
export const SelectionModal = (props: SelectionModalProps) => {
  return (
    <Modal show={props.show} onHide={props.handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Seleccionaste la opcion:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.selectionForModal ? (
          <>
            <p>
              <strong>Taller:</strong>{" "}
              <em>{capitalizeString(props.selectionForModal.workshop)}</em>
            </p>
            <p>
              <strong>Teacher:</strong>{" "}
              <em>{capitalizeString(props.selectionForModal.teacher)}</em>
            </p>
            <p>
              <strong>Horario:</strong> <em>{props.selectionForModal.time}</em>
            </p>
            <p>
              <strong>Dia:</strong>{" "}
              <em>{capitalizeString(props.selectionForModal.day)}</em>
            </p>
          </>
        ) : null}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleCloseModal}>
          Cancelar
        </Button>
        <Button
          data-testid="modal-reservar-button"
          variant="primary"
          onClick={() => props.handleReservationConfirmation()}
        >
          Reservar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

type WorkshopSelectorProps = {
  workshop: Workshop;
  index: number;
  student: Student;
  selectWorkshop: (selectionId: string) => void;
};
export const WorkshopSelector = ({
  workshop,
  index,
  student,
  selectWorkshop,
}: WorkshopSelectorProps) => {
  const eventKey = index.toString();
  return (
    <Accordion key={index}>
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
                    <Card.Body className={option.available ? "" : "text-muted"}>
                      {option.time}
                      {option.available ? (
                        <p>
                          <Button
                            onClick={() => {
                              selectWorkshop(option.id);
                            }}
                            data-testid={`button-reservar-${option.id}`}
                          >
                            Reservar
                          </Button>
                        </p>
                      ) : (
                        <Alert variant="danger">Lugares no disponibles</Alert>
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
};

export const GET_STUDENT = gql`
  query getSelectionInfo($code: ID!) {
    student(codigo: $code) {
      codigo
      nombre
      nivel
    }
    studentReservation(codigo: $code) {
      workshopName
      day
      time
      teacher
      url
      zoom_id
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
      teacher
      day
      time
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
