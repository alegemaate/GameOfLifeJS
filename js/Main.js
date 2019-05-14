import MenuState from "./MenuState.js";
import GameState from "./GameState.js";

// Window resizing
function resize(width, height) {
	var canvas = document.querySelector("canvas");
	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;
	var windowRatio = windowWidth / windowHeight;
	var gameRatio = width / height;

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
window.addEventListener("load", function(event) {
  var game = new Phaser.Game({
	  type: Phaser.AUTO,
	  width: 600,
	  height: 600,
	  backgroundColor: '#000',
	  parent: "game-container",
	  scene: [ GameState, MenuState ]
	});

	document.querySelector("canvas").oncontextmenu = function (e) { e.preventDefault(); }

  resize(game.config.width, game.config.height);
  window.addEventListener("resize", () => resize(game.config.width, game.config.width), false);
})
