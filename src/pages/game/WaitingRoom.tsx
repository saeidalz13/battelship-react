import { useNavigate } from "react-router-dom";
import BackMainMenu from "../../components/buttons/BackMainMenu";
import { divTopMargin } from "../../constants/divConsts";

import MainHomeButton from "../../components/buttons/MainHomeButton";
import MainRoutes from "../../routes/MainRoutes";

const WaitingRoom = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-5">
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
