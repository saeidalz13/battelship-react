import MainHomeButton from "./MainHomeButton";
import MainRoutes from "../../routes/MainRoutes";
import { useNavigate } from "react-router-dom";
import { divTopMargin } from "../../constants/divConsts";

interface BackMainMenuProps {
  topMargin: divTopMargin;
}

const BackMainMenu = (props: BackMainMenuProps) => {
  const navigate = useNavigate();

  return (
    <div className={props.topMargin}>
      <MainHomeButton
        onClick={() => navigate(MainRoutes.Home)}
        text="Back To Main Page"
        variant="dark"
      />
    </div>
  );
};

export default BackMainMenu;
