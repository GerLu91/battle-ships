import { createGameboard } from "./factories/gameboardFactory.js";
import { createShip } from "./factories/shipFactory.js";
import { FLEET_SCHEMA } from "./logic/fleetConfig.js";
import { initCombatPhase } from "./logic/gameController.js";
import { initBoard } from "./ui/boardUI.js";
import { initDragAndDrop, renderShipDrawer } from "./ui/placementUI.js";

const playerBoard = createGameboard();
const playerContainer = document.getElementById("player-board");

const startButton = document.getElementById("start-game");

initBoard(playerContainer, (index) => {
  console.log("Feld klickt während Setup:", index);
});

renderShipDrawer(FLEET_SCHEMA);
initDragAndDrop(playerBoard, createShip);

startButton.addEventListener("click", () => {
  const drawer = document.getElementById("ship-drawer");
  if (drawer) drawer.remove();
  startButton.classList.add("hidden");

  initCombatPhase(playerBoard);
});
