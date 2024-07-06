import { useNavigate } from "react-router-dom";
import MainHomeButton from "../../components/buttons/MainHomeButton";
import MainHeader from "../../components/headers/MainHeader";
import { useState } from "react";
import BackMainMenu from "../../components/buttons/BackMainMenu";
import { divTopMargin } from "../../constants/divConsts";
import MainRoutes from "../../routes/MainRoutes";
import { GridSize } from "../../models/websocket/Enums";

const ChooseDifficulty = () => {
  const navigate = useNavigate();
  const [isBtnDisabled, setIsBtnDisabled] = useState<boolean>(false);

  const handleDifficultySelection = (gridSize: number) => {
    setIsBtnDisabled(true);

    navigate(`${MainRoutes.Game}?gridSize=${gridSize}`)
  };

  return (
    <div className="text-center">
      <MainHeader text="Choose Difficulty" />

      <div className="mb-2">
        <MainHomeButton
          onClick={() => handleDifficultySelection(GridSize.EASY)}
          text="6 * 6 (Easy)"
          variant="success"
          isDisabled={isBtnDisabled}
        />
      </div >
      <div className="mb-2">
        <MainHomeButton
          onClick={() => handleDifficultySelection(GridSize.NORMAL)}
          text="7 * 7 (Normal)"
          variant="warning"
          isDisabled={isBtnDisabled}
        />
      </div>
      <div>
        <MainHomeButton
          onClick={() => handleDifficultySelection(GridSize.HARD)}
          text="8 * 8 (Hard)"
          variant="danger"
          isDisabled={isBtnDisabled}
        />
      </div>
      <BackMainMenu topMargin={divTopMargin.THREE} />
    </div>
  );
};

export default ChooseDifficulty;
