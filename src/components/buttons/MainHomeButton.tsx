import { Button } from "react-bootstrap";

interface MainHomeButtonProps {
  text: string;
  variant: string;
  onClick?: () => void;
  isDisabled?: boolean;
}

const MainHomeButton = (props: MainHomeButtonProps) => {
  return (
    <Button onClick={props.onClick} variant={props.variant} disabled={props.isDisabled}>
      {props.text}
    </Button>
  );
};

export default MainHomeButton;
