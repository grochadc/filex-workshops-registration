import React, { useReducer, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

type LinksEditorProps = {
  options: any[];
  saveLinkOnServer: (variables: { option_id: string; link: string }) => void;
};
function LinksEditor(props: LinksEditorProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  type LinksType = { [id: string]: string };
  const initialState: LinksType = props.options.reduce((object, option) => {
    return { ...object, [option.id]: option.url };
  }, {});
  const reducer = (
    state: LinksType,
    action: { id: string; payload: string }
  ) => {
    return { ...state, [action.id]: action.payload };
  };
  const [links, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <button
        className="bg-blue-500 rounded text-white p-2 m-1 hover:bg-blue-700"
        onClick={openModal}
      >
        Edit your links
      </button>
      <Modal show={isModalOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {props.options.map((option) => {
              return (
                <Form.Group key={option.id}>
                  <Form.Label>
                    {option.workshop_name} {option.day} {option.time}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={links[option.id]}
                    onChange={(e) =>
                      dispatch({ id: option.id, payload: e.target.value })
                    }
                  />
                  <button
                    className="bg-slate-500 rounded text-white p-2 m-1"
                    onClick={() =>
                      props.saveLinkOnServer({
                        option_id: option.id,
                        link: links[option.id],
                      })
                    }
                  >
                    Save
                  </button>
                </Form.Group>
              );
            })}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default LinksEditor;
