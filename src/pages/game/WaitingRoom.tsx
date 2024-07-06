import { useNavigate } from "react-router-dom";
import BackMainMenu from "../../components/buttons/BackMainMenu";
import { divTopMargin } from "../../constants/divConsts";

import MainHomeButton from "../../components/buttons/MainHomeButton";
import MainRoutes from "../../routes/MainRoutes";
import { Button, Modal } from "react-bootstrap";

interface WaitingRoomProps {
  gameUuid: string;
  onHide: () => void;
}

const WaitingRoom = (props: WaitingRoomProps) => {
  const navigate = useNavigate();

  return (
    <div className="mt-5">
      <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>

      <div className="text-center mt-2">
        <MainHomeButton
          text="Back To Difficulty"
          variant="warning"
          onClick={() => navigate(MainRoutes.ChooseDifficulty)}
        />
      </div>

      <div className="text-center">
        <BackMainMenu topMargin={divTopMargin.FOUR} />
      </div>
    </div>
  );
};

export default WaitingRoom;
