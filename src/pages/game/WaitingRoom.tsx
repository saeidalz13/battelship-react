import { useNavigate } from "react-router-dom";
import BackMainMenu from "../../components/buttons/BackMainMenu";
import { divTopMargin } from "../../constants/divConsts";
import { FaCopy } from "react-icons/fa";
import GeneralButton from "../../components/buttons/GeneralButton";
import MainRoutes from "../../routes/MainRoutes";
import { Button, Modal, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";

interface WaitingRoomProps {
  gameUuid: string;
  wsConn: WebSocket | null;
}

const WaitingRoom = (props: WaitingRoomProps) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const handleCopyClick = () => {
    navigator.clipboard.writeText(props.gameUuid);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const closeWsConn = () => {
    if (props.wsConn) {
      props.wsConn.close();
    }
  };

  const handleBackToDifficulty = () => {
    closeWsConn();
    navigate(MainRoutes.ChooseDifficulty);
  };

  useEffect(() => {
    if (props.gameUuid !== "") {
      setShowModal(true);
    }
  }, [props.gameUuid]);

  return (
    <div className="mt-5">
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Game ID</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.gameUuid !== "" ? (
            <>
              <div className="game-uuid-copy">
                <span style={{ fontSize: "1.4rem" }}>{props.gameUuid}</span>
                <Button
                  className="ms-3"
                  variant="success"
                  onClick={handleCopyClick}
                >
                  <FaCopy />
                </Button>
              </div>
              <div className="text-center mt-2 text-success">
                Copy this code and share it with your opponent!
              </div>
              {showAlert && (
                <div
                  className="mt-3"
                  style={{ maxWidth: "6rem", margin: "auto" }}
                >
                  <Alert variant="success" className="text-center">
                    Copied!
                  </Alert>
                </div>
              )}
            </>
          ) : (
            "NO Game ID; Server Error!"
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="text-center mt-2">
        <GeneralButton
          text="Back To Difficulty"
          variant="warning"
          onClick={handleBackToDifficulty}
        />
      </div>

      <div className="text-center">
        <BackMainMenu topMargin={divTopMargin.FOUR} onClick={closeWsConn} />
      </div>
    </div>
  );
};

export default WaitingRoom;
