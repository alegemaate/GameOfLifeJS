import MenuState from "./MenuState.js";
import GameState from "./GameState.js";

// Window resizing
function resize(width, height) {
	var canvas = document.querySelector("canvas");
	var parentWidth = canvas.parentElement.offsetWidth;
	var parentHeight = canvas.parentElement.offsetHeight;

	var windowRatio = parentWidth / parentHeight;
	var gameRatio = width / height;

	if(windowRatio < gameRatio) {
	  canvas.style.width = parentWidth + "px";
	  canvas.style.height = (parentWidth / gameRatio) + "px";
	}
	else {
	  canvas.style.width = (parentHeight * gameRatio) + "px";
	  canvas.style.height = parentHeight + "px";
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
