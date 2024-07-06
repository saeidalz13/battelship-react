import { Button, Col, Container, Row } from "react-bootstrap";

interface ActionRoomProps {
  gridArr: number[];
}

const ActionRoom = (props: ActionRoomProps) => {
  return (
    <div>
      <Container style={{ maxWidth: "300px" }}>
        {props.gridArr.map((value) => (
          <Row
            key={value}
            className="mb-1 align-items-center justify-content-center"
          >
            {props.gridArr.map((value) => (
              <Col key={value} className="px-1" style={{ width: "1px" }}>
                <Button className="p-3" variant="info"></Button>
              </Col>
            ))}
          </Row>
        ))}
      </Container>
    </div>
  );
};

export default ActionRoom;
