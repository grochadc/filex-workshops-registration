import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Workshop } from "../generated/grapqhl";
import WorkshopSelector from "./WorkshopSelector";

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
  isWorkshopsOpen: boolean;
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
        {!props.isWorkshopsOpen ? (
          <Alert variant="primary">
            El registro esta cerrado. El horario para registro de talleres es
            Viernes a partir de las 11:00 am
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

export default Selection;
