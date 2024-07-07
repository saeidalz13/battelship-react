import { useNavigate } from "react-router-dom";
import GeneralButton from "../components/buttons/GeneralButton";
import MainHeader from "../components/headers/MainHeader";
import MainRoutes from "../routes/MainRoutes";

const Home = () => {
  const navigate = useNavigate();

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
        <GeneralButton text="Join Game" variant="danger" />
      </div>
    </div>
  );
};

export default Home;
