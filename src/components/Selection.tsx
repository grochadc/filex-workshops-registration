import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Workshop } from "../generated/grapqhl";

type SelectionForModal = {
  workshop_name: string;
  teacher_name: string;
  day: string;
  time: string;
  isTutorial: boolean;
};

type SelectionProps = {
  student: any;
  workshops: Workshop[];
  onReservation: (option_id: string, tutorial_reason?: string) => void;
};
const Selection = (props: SelectionProps) => {
  const [selectionForModal, setSelectionForModal] = useState({
    day: "",
    time: "",
    teacher_name: "",
    workshop_name: "",
    isTutorial: false,
  });
  const [showModal, setShowModal] = useState(false);
  const [selection, setSelection] = useState({ option_id: "", teacher_id: "" });
  const selectWorkshop = (selectionId: string) => {
    const options = props.workshops.map((workshop) => workshop.options).flat();
    const selectedOption = options.filter(
      (option) => option.id === selectionId
    )[0];

    setSelection({
      option_id: selectionId,
      teacher_id: selectedOption.teacher_id,
    });
    setSelectionForModal(selectedOption);
    setShowModal(true);
  };
  const handleReservationConfirmation = (tutorial_reason?: string) => {
    props.onReservation(selection.option_id, tutorial_reason);
  };
  return (
    <Container>
      <div>
        <>Hola {props.student.nombre}!</>
        {props.student.reservation ? (
          <Alert variant="primary">
            Ya cuentas con una reservación.{" "}
            <Link to="/details">Revisar detalles</Link>
          </Alert>
        ) : null}
        {props.workshops
          .filter((workshop) => workshop.levels.includes(props.student.nivel))
          .map((workshop: Workshop, workshopIndex: number) => (
            <WorkshopSelector
              key={workshopIndex}
              workshop={workshop}
              index={workshopIndex}
              selectWorkshop={selectWorkshop}
              student={props.student}
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
  handleReservationConfirmation: (tutorial_reason?: string) => void;
  show: boolean;
  selectionForModal: SelectionForModal | undefined;
};
export const SelectionModal = (props: SelectionModalProps) => {
  const [tutorialReason, setTutorialReason] = useState("");
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
              <em>{props.selectionForModal.workshop_name}</em>
            </p>
            <p>
              <strong>Teacher:</strong>{" "}
              <em>{props.selectionForModal.teacher_name}</em>
            </p>
            <p>
              <strong>Horario:</strong> <em>{props.selectionForModal.time}</em>
            </p>
            <p>
              <strong>Dia:</strong> <em>{props.selectionForModal.day}</em>
            </p>
            {props.selectionForModal.isTutorial ? (
              <p>
                ¿En que tema necesitas ayuda? <br />
                <input
                  type="text"
                  value={tutorialReason}
                  onChange={({ target }) => setTutorialReason(target.value)}
                />
              </p>
            ) : null}
          </>
        ) : (
          "No has seleccionado una opcion"
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleCloseModal}>
          Cancelar
        </Button>
        <Button
          data-testid="modal-reservar-button"
          variant="primary"
          onClick={() =>
            props.handleReservationConfirmation(
              tutorialReason.length > 0 ? tutorialReason : undefined
            )
          }
        >
          Reservar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

type WorkshopSelectorProps = {
  workshop: any;
  index: number;
  student: Student;
  selectWorkshop: (selectionId: string, teacher_id: string) => void;
};
export const WorkshopSelector = ({
  workshop,
  index,
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
                      Teacher {option.teacher_name}
                    </Card.Title>
                    <Card.Subtitle
                      className={option.available ? "" : "text-muted"}
                    >
                      {option.day}
                    </Card.Subtitle>
                    <Card.Body className={option.available ? "" : "text-muted"}>
                      {option.time}
                      {option.available ? (
                        <p>
                          <Button
                            onClick={() => {
                              selectWorkshop(option.id, option.teacher_id);
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

const optionCardStyles = {
  width: "18rem",
  cursor: "pointer",
  color: "black",
  textDecoration: "none",
};

export default Selection;
