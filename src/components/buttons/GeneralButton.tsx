import { Button } from "react-bootstrap";

interface MainHomeButtonProps {
  isDisabled?: boolean;
  text: string;
  variant: string;
  onClick?: () => void;
}

const GeneralButton = (props: MainHomeButtonProps) => {
  return (
    <Button
      onClick={props.onClick}
      variant={props.variant}
      disabled={props.isDisabled}
    >
      {props.text}
    </Button>
  );
};

export default GeneralButton;
