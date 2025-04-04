import { Game } from "./game";

describe("game", () => {
  it("game shouid be created and return status ", () => {
    const game = new Game();
    expect(game.status).toBe("SETTINGS");
  });
});
