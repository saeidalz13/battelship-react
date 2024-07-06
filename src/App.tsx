import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import mainRoutes from "./routes/MainRoutes";
import Home from "./pages/Home";
import ChooseDifficulty from "./pages/game/ChooseDifficulty";
import Game from "./pages/game/Game";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path={mainRoutes.Home} element={<Home />} />
      <Route path={mainRoutes.ChooseDifficulty} element={<ChooseDifficulty />} />
      <Route path={mainRoutes.Game} element={<Game />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
