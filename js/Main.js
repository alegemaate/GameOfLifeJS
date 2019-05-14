import MenuState from "./MenuState.js";
import GameState from "./GameState.js";

// Window resizing
function resize(game) {
	var canvas = document.querySelector("canvas");
	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;
	var windowRatio = windowWidth / windowHeight;
	var gameRatio = game.config.width / game.config.height;

	if(windowRatio < gameRatio) {
	  canvas.style.width = windowWidth + "px";
	  canvas.style.height = (windowWidth / gameRatio) + "px";
	}
	else {
	  canvas.style.width = (windowHeight * gameRatio) + "px";
	  canvas.style.height = windowHeight + "px";
	}
}

// Create game
window.onload = function() {
  var game = new Phaser.Game({
	  type: Phaser.AUTO,
	  width: 500,
	  height: 500,
	  backgroundColor: '#000',
	  parent: "game-container",
	  scene: [ GameState, MenuState ]
	});

  resize(game);
  window.addEventListener("resize", () => resize(game), false);
}
