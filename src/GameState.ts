import { modulo } from "./helpers/modulo";

// State
export default class GameState extends Phaser.Scene {
  // Width of board
  private width: number = 0;

  // Height of board
  private height: number = 0;

  // Paused state
  private paused: boolean = true;

  // Size of individual cell
  private readonly cellSize: number = 5;

  // Ticker time
  private readonly tickerTime: number = 50;

  // Map
  private lMap: number[][] = [];

  // Paused text
  private pausedText!: Phaser.GameObjects.Text;

  // Graphics
  private graphics!: Phaser.GameObjects.Graphics;

  // Init
  public constructor() {
    super({
      active: false,
      key: "GameState",
    });
  }

  // Create
  public create(): void {
    // Game state variables
    this.pausedText = this.add
      .text(10, 10, "PAUSED - Press the P", {
        fill: "#ffffff",
        font: "16px Courier",
      })
      .setShadow(1, 1);

    this.graphics = this.add.graphics({
      lineStyle: { color: 0xaa00aa, width: 4 },
    });

    // Generate map
    const { width, height } = this.sys.game.canvas;
    this.width = Math.ceil(width / this.cellSize);
    this.height = Math.ceil(height / this.cellSize);

    this.lMap = Array<number>(this.width)
      .fill(0)
      .map(() => Array<number>(this.height).fill(0));

    this.input.keyboard.on(
      "keydown",
      (event: Phaser.Input.Keyboard.Key) => {
        if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.P) {
          this.togglePlay();
        }
      },
      this
    );

    this.input.on(
      "pointermove",
      (pointer: Phaser.Input.Pointer) => {
        if (pointer.isDown) {
          this.click(pointer);
        }
      },
      this
    );

    this.input.on(
      "pointerdown",
      (pointer: Phaser.Input.Pointer) => {
        this.click(pointer);
      },
      this
    );

    this.time.delayedCall(this.tickerTime, this.ticker.bind(this), [], this);
  }

  // Update
  public update(): void {
    // Draw
    this.graphics.clear();

    for (let i = 0; i < this.width; i += 1) {
      for (let t = 0; t < this.height; t += 1) {
        if (this.lMap[i][t] === 1) {
          this.graphics.fillStyle(0xffffff, 1.0);
          this.graphics.fillRect(
            i * this.cellSize,
            t * this.cellSize,
            this.cellSize,
            this.cellSize
          );
        }
      }
    }
  }

  // Ticker
  private ticker(): void {
    // Simulate
    if (!this.paused) {
      const tempMap = Array<number>(this.width)
        .fill(0)
        .map(() => Array<number>(this.height).fill(0));

      for (let i = 0; i < this.width; i += 1) {
        for (let t = 0; t < this.height; t += 1) {
          // Number of neighbouring cells
          const neighbours =
            this.lMap[modulo(i + 1, this.width)][t] +
            this.lMap[modulo(i - 1, this.width)][t] +
            this.lMap[i][modulo(t + 1, this.height)] +
            this.lMap[i][modulo(t - 1, this.height)] +
            this.lMap[modulo(i + 1, this.width)][modulo(t + 1, this.height)] +
            this.lMap[modulo(i - 1, this.width)][modulo(t - 1, this.height)] +
            this.lMap[modulo(i - 1, this.width)][modulo(t + 1, this.height)] +
            this.lMap[modulo(i + 1, this.width)][modulo(t - 1, this.height)];

          // Dies from overpop or underpop
          if (neighbours < 2 || neighbours > 3) {
            tempMap[i][t] = 0;
          }
          // Is born
          else if (neighbours === 3) {
            tempMap[i][t] = 1;
          }
          // Stays the same
          else if (neighbours === 2) {
            tempMap[i][t] = this.lMap[i][t];
          }
        }
      }

      this.lMap = [...tempMap];
    }

    this.time.delayedCall(this.tickerTime, this.ticker.bind(this), [], this);
  }

  // Click event
  private click(pointer: Phaser.Input.Pointer): void {
    if (pointer.buttons === 1) {
      this.lMap[Math.floor(pointer.x / this.cellSize)][
        Math.floor(pointer.y / this.cellSize)
      ] = 1;
    } else if (pointer.buttons === 2) {
      this.lMap[Math.floor(pointer.x / this.cellSize)][
        Math.floor(pointer.y / this.cellSize)
      ] = 0;
    }
  }

  // Toggle pause play
  private togglePlay(): void {
    this.paused = !this.paused;

    if (this.paused) {
      this.pausedText.text = "PAUSED - Press P to play";
    } else {
      this.pausedText.text = "PLAYING - Press P to pause";
    }
  }
}
