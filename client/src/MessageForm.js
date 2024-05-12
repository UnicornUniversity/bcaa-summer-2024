import { useContext, useState } from "react";
import { EventContext } from "./EventContext.js";
import { UserContext } from "./UserContext.js";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import Alert from "react-bootstrap/Alert";
import Editor from "react-simple-wysiwyg";

import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

function MessageForm({ setShowMessageForm, event }) {
  const { state, handlerMap } = useContext(EventContext);
  const { loggedInUser } = useContext(UserContext);
  const [showAlert, setShowAlert] = useState(null);
  const [html, setHtml] = useState("");

  function onChange(e) {
    setHtml(e.target.value);
  }

  const isPending = state === "pending";

  return (
    <Modal show={true} onHide={() => setShowMessageForm(false)}>
      <Modal.Header>
        <Modal.Title>Vytvořit zprávu</Modal.Title>
        <CloseButton onClick={() => setShowMessageForm(false)} />
      </Modal.Header>
      <Modal.Body style={{ position: "relative" }}>
        <Alert
          show={!!showAlert}
          variant="danger"
          dismissible
          onClose={() => setShowAlert(null)}
        >
          <Alert.Heading>Nepodařilo se vytvořit událost</Alert.Heading>
          <pre>{showAlert}</pre>
        </Alert>
        {isPending ? (
          <div style={pendingStyle()}>
            <Icon path={mdiLoading} size={2} spin />
          </div>
        ) : null}
        <Editor value={html} onChange={onChange} />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setShowMessageForm(false)}
          disabled={isPending}
        >
          Zavřít
        </Button>
        <Button
          variant="primary"
          disabled={isPending}
          onClick={async () => {
            try {
              await handlerMap.handleCreateMessage({
                text: html,
                eventId: event.id,
                userId: loggedInUser.id,
              });
              setShowMessageForm(false);
            } catch (e) {
              console.error(e);
              setShowAlert(e.message);
            }
          }}
        >
          Vytvořit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function pendingStyle() {
  return {
    position: "absolute",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    opacity: "0.5",
  };
}

export default MessageForm;
