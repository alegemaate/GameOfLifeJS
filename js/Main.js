import MenuState from "./MenuState.js";
import GameState from "./GameState.js";

// Config for game
var config = {
  type: Phaser.AUTO,
  width: 600,
  height: 600,
  backgroundColor: '#000',
  parent: "game-container",
  scene: [ GameState, MenuState ]
};

// Create game
var game = new Phaser.Game(config);