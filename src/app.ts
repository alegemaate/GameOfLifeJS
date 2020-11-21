import * as Phaser from "phaser";

import GameState from "./GameState";

const config: Phaser.Types.Core.GameConfig = {
  backgroundColor: "#000",
  height: 600,
  parent: "game-container",
  scene: [
    GameState
  ],
  type: Phaser.AUTO,
  width: 600,
};

export const game = new Phaser.Game(config);