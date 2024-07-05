import { useNavigate, useSearchParams } from "react-router-dom";
import BackMainMenu from "../../components/buttons/BackMainMenu";
import { divTopMargin } from "../../constants/divConsts";
import { Button, Col, Container, Row } from "react-bootstrap";
import MainHomeButton from "../../components/buttons/MainHomeButton";
import MainRoutes from "../../routes/MainRoutes";

const WaitingRoom = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const gridSize = searchParams.get("gridSize");

  if (gridSize === null) {
    return (
      <>
        Invalid Route! Please go back
        <BackMainMenu topMargin={divTopMargin.FOUR} />
      </>
    );
  }

  const gridArr: number[] = [];
  for (let i = 0; i < Number(gridSize); i++) {
    gridArr.push(i);
  }

  return (
    <div className="mt-5">
      <Container style={{ maxWidth: "300px" }}>
        {gridArr.map((value) => (
          <Row
            key={value}
            className="mb-1 align-items-center justify-content-center"
          >
            {gridArr.map((value) => (
              <Col key={value} className="px-1" style={{ width: "1px" }}>
                <Button className="p-3" variant="info"></Button>
              </Col>
            ))}
          </Row>
        ))}
      </Container>

        {/* !!!!! This is temporary  */}
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
