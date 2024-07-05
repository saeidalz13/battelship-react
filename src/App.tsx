import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import mainRoutes from "./routes/MainRoutes";
import Home from "./pages/Home";
import ChooseDifficulty from "./pages/createGame/ChooseDifficulty";
import WaitingRoom from "./pages/createGame/WaitingRoom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path={mainRoutes.Home} element={<Home />} />
      <Route path={mainRoutes.ChooseDifficulty} element={<ChooseDifficulty />} />
      <Route path={mainRoutes.WaitingRoom} element={<WaitingRoom />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
