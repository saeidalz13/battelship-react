import { useNavigate } from "react-router-dom";
import GeneralButton from "../components/buttons/GeneralButton";
import MainHeader from "../components/headers/MainHeader";
import MainRoutes from "../routes/MainRoutes";
import { Form, Button, Modal } from "react-bootstrap";
import { useRef, useState } from "react";

const Home = () => {
  const navigate = useNavigate();

  const gameUuid = useRef<HTMLInputElement>(null);
  const isHost = false
  const [showJoinModal, setShowJoinModal] = useState<boolean>(false);

  const handleJoinGame = () => {
    if (gameUuid.current) {
      navigate(`${MainRoutes.Game}?joinGameUuid=${gameUuid.current.value}&isHost=${isHost}`)
    }
  };

  return (
    <div className="text-center mt-5">
      <div className="mb-3">
        <MainHeader text="Battleship!" />
      </div>

      <div className="mb-2">
        <GeneralButton
          onClick={() => navigate(MainRoutes.ChooseDifficulty)}
          text="Create Game"
          variant="warning"
        />
      </div>
      <div>
        <GeneralButton
          text="Join Game"
          variant="danger"
          onClick={() => setShowJoinModal(true)}
        />
      </div>

      <Modal
        onHide={() => setShowJoinModal(false)}
        show={showJoinModal}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Enter Code</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formCode">
              {/* <Form.Label>Email address</Form.Label> */}
              <Form.Control
                ref={gameUuid}
                type="text"
                placeholder="Game Code"
              />
              <Form.Text className="text-muted">
                The host player needs to share a code with you.
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowJoinModal(false)}>
            Close
          </Button>
          <Button variant="success" onClick={handleJoinGame}>
            Join Game!
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
