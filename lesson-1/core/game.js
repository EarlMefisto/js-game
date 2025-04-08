import { GameStatuses } from "./game-statuses";

export class Game {
  #status = GameStatuses.settings;
  #googlePosition = null;
  #numberUtility; // = new ShogunNumberUtility()

  constructor(somethingSimilarToNumberUtility) {
    this.#numberUtility = somethingSimilarToNumberUtility;
  }

  #settings = {
    gridSize: {
      columnsCount: 4,
      rowsCount: 4,
    },
    googleJumpInterval: 1000,
  };

  /**
   * Sets the Google Jump Interval.
   *
   * @param {number} newValue - The new interval value to be set.
   * @throws {TypeError} If the provided value is not a number.
   * @throws {RangeError} If the provided value is less than or equal to 0.
   *
   * This method updates the internal settings for the Google Jump Interval.
   * The value must be a positive number; otherwise, it throws an error.
   */

  set googleJumpInterval(newValue) {
    if (typeof newValue !== "number") {
      throw new TypeError("Arguments must be numbers");
    }
    if (newValue <= 0) {
      throw new RangeError("Interval must be numbers");
    }
    this.#settings.googleJumpInterval = newValue;
  }

  start() {
    if (this.#status !== GameStatuses.settings) {
      throw new Error("Game must be Setting before Start");
    }
    this.#status = GameStatuses.inProgress;
    this.#makeGoogleJump();

    setInterval(() => {
      this.#makeGoogleJump();
    }, this.#settings.googleJumpInterval);
  }

  #makeGoogleJump() {
    const newPosition = {
      x: this.#numberUtility.getRandomIntegerNumber(
        0,
        this.#settings.gridSize.columnsCount
      ),
      y: this.#numberUtility.getRandomIntegerNumber(
        0,
        this.#settings.gridSize.rowsCount
      ),
    };
    if (
      newPosition.x === this.googlePosition?.x &&
      newPosition.y === this.googlePosition?.y
    ) {
      this.#makeGoogleJump();
      return;
    }
    this.#googlePosition = newPosition;
  }

  get status() {
    return this.#status;
  }
  get googlePosition() {
    return this.#googlePosition;
  }
  get gridSize() {
    return this.#settings.gridSize;
  }
}
