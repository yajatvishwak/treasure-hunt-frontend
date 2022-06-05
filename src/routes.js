// @ts-nocheck
import Auth from "./routes/Auth.svelte";
import Game from "./routes/Game.svelte";

const routes = {
  // Exact path
  "/": Auth,
  "/game": Game,
};

export default routes;
