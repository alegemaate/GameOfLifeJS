// State
export default class GameState extends Phaser.Scene {
  // Init
  constructor () {
    super({ 
      key: 'GameState', 
      active: false,
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
          gravity: { y: 0 }
        }
      }
    });
  }
  
  // Create
  create () {
    // Game state variables
    this.paused = true;
    this.cellSize = 20;
    this.pausedText = this.add.text(10, 10, 'PAUSED - Press the SPACE BAR', { font: '16px Courier', fill: '#ffffff' }).setShadow(1, 1);

    this.graphics = this.add.graphics({ lineStyle: { width: 4, color: 0xaa00aa } });

    // Generate map
    let { width, height } = this.sys.game.canvas;
    this.LIFE_W = Math.ceil(width / this.cellSize);
    this.LIFE_H = Math.ceil(height / this.cellSize);

    this.l_map = Array(this.LIFE_W).fill().map(() => Array(this.LIFE_H).fill(0));

    this.input.keyboard.on('keydown', function (event) {
        if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.SPACE) {
          this.togglePlay();
        }
    }, this);

    this.input.on('pointerdown', function (pointer) {
        this.click(pointer);
    }, this);
  }

  // Update
  update() {
    // Draw
    this.graphics.clear();

    for (var i = 0; i < this.LIFE_W; i++) {
      for (var t = 0; t < this.LIFE_H; t++) {
        if (this.l_map[i][t] == 1) {
          this.graphics.fillStyle(0xFFFFFF, 1.0);
          this.graphics.fillRect(i * this.cellSize, t * this.cellSize,
                                 this.cellSize, this.cellSize);
        }
      }
    }

    // Simulate
    if (!this.paused) {
      this.temp_map = Array(this.LIFE_W).fill().map(() => Array(this.LIFE_H).fill(0));

      for (var i = 0; i < this.LIFE_W; i++) {
        for (var t = 0; t < this.LIFE_H; t++) {
          // Number of neighbouring cells
          var neighbours = this.l_map[this.modulo((i + 1),this.LIFE_W)][t                               ] + 
                           this.l_map[this.modulo((i - 1),this.LIFE_W)][t                               ] +
                           this.l_map[i                               ][this.modulo((t + 1),this.LIFE_H)] + 
                           this.l_map[i                               ][this.modulo((t - 1),this.LIFE_H)] +
                           this.l_map[this.modulo((i + 1),this.LIFE_W)][this.modulo((t + 1),this.LIFE_H)] + 
                           this.l_map[this.modulo((i - 1),this.LIFE_W)][this.modulo((t - 1),this.LIFE_H)] +
                           this.l_map[this.modulo((i - 1),this.LIFE_W)][this.modulo((t + 1),this.LIFE_H)] + 
                           this.l_map[this.modulo((i + 1),this.LIFE_W)][this.modulo((t - 1),this.LIFE_H)];

          // Dies from overpop or underpop
          if (neighbours < 2 || neighbours > 3)
             this.temp_map[i][t] = 0;

          // Is born
          else if (neighbours == 3)
            this.temp_map[i][t] = 1;
          // Stays the same
          else if (neighbours == 2)
            this.temp_map[i][t] = this.l_map[i][t];
        }
      }

      this.l_map = [...this.temp_map];
    }
  }

  // Custom mod
  modulo(m, n) {
    return m >= 0 ? m % n : (n - Math.abs(m % n)) % n;
  }

  // Click event
  click (pointer) {
    if (pointer.buttons == 1)
      this.l_map[Math.floor(pointer.downX / this.cellSize)][Math.floor(pointer.downY / this.cellSize)] = 1;
    else if (pointer.buttons == 2)
      this.l_map[Math.floor(pointer.downX / this.cellSize)][Math.floor(pointer.downY / this.cellSize)] = 0;
  }

  // Toggle pause play
  togglePlay () {
    this.paused = !this.paused;

    if (this.paused) 
      this.pausedText.text = 'PAUSED - Press the SPACE BAR';
    else
      this.pausedText.text = 'PLAYING - Press the SPACE BAR';
  }
}