import { createGameboard } from "./factories/gameboardFactory.js";
import { createShip } from "./factories/shipFactory.js";
import { FLEET_SCHEMA } from "./logic/fleetConfig.js";
import { initCombatPhase } from "./logic/gameController.js";
import { initBoard } from "./ui/boardUI.js";
import { handleRandomPlacement, initDragAndDrop, renderShipDrawer } from "./ui/placementUI.js";

const playerBoard = createGameboard();
const playerContainer = document.getElementById("player-board");

const startButton = document.getElementById("start-game");
const randomButton = document.getElementById('random-fleet');

initBoard(playerContainer, playerBoard, (index) => {
  console.log("Feld klickt während Setup:", index);
}, false);



renderShipDrawer(FLEET_SCHEMA);
initDragAndDrop(playerBoard, createShip);

randomButton.addEventListener('click', () => {
  handleRandomPlacement( playerContainer, playerBoard, FLEET_SCHEMA, createShip,(index) => {
  console.log("Feld klickt während Setup:", index);
})
})

startButton.addEventListener("click", () => {
  const drawer = document.getElementById("ship-drawer");
  if (drawer) drawer.remove();
  startButton.classList.add("hidden");
  startButton.disabled = true;
  playerContainer.style.pointerEvents = 'none';

  initCombatPhase(playerBoard);
});
