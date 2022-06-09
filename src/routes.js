// @ts-nocheck
import Auth from "./routes/Auth.svelte";
import Game from "./routes/Game.svelte";
import FinCode from "./routes/FinCode.svelte";
import Login from "./routes/Login.svelte";
import Leaderboard from "./routes/Leaderboard.svelte";

const routes = {
  // Exact path
  "/": Auth,
  "/game": Game,
  "/fincode": FinCode,
  "/leaderboard": Leaderboard,
  "/login": Login,
};

export default routes;
