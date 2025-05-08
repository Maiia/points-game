import {
  BoardColors,
  CellState,
  LiveGameState,
  Position,
} from "../types/gameState";

function generateEmptyBoard(
  width: number,
  height: number,
  blocked: Position[] = [],
): CellState[][] {
  const board: CellState[][] = [];

  for (let y = 0; y < height; y++) {
    const row: CellState[] = [];
    for (let x = 0; x < width; x++) {
      const isBlocked = blocked.some((cell) => cell.x === x && cell.y === y);
      row.push({
        ownerCharacterId: null,
        isBlocked,
        isCaptured: false,
      });
    }
    board.push(row);
  }

  return board;
}

export const mockGameState: LiveGameState = {
  gameId: "game-001",
  board: generateEmptyBoard(10, 10, [
    { x: 3, y: 4 },
    { x: 6, y: 2 },
  ]),
  players: {
    "char-001": {
      color: BoardColors.yellow,
      cells: [],
      capturedZones: [],
    },
    "char-123": {
      color: BoardColors.blue,
      cells: [],
      capturedZones: [],
    },
  },
  currentTurnCharacterId: "char-001",
  diceRolls: {
    "char-001": {
      value: 5,
    },
    "char-123": {
      value: 1,
    },
  },
  blockedCells: [],
  lastMoveTime: new Date(),
  lastDiceRollCharacterId: "char-001",
};
