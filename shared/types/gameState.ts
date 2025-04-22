export type Position = {
  x: number;
  y: number;
};

export type CellState = {
  owner: string | null; // characterId або null
  isBlocked: boolean;
  isCaptured: boolean;
};

export type CharacterId = string;

export type Character = {
  nickname: string;
  rating: number;
  id: CharacterId;
  userId: string;
};

export enum BoardColors {
  blue = "blue",
  yellow = "yellow",
}

export type PlayerState = Character & {
  color: BoardColors;
  cells: Position[];
  capturedZones: Position[];
};

export type GameState = {
  gameId: string;
  board: CellState[][];
  players: Record<CharacterId, PlayerState>;
  currentTurn: string; // characterId
  lastDiceRoll: number;
  blockedCells: Position[];
  status: "waiting" | "active" | "finished";
  lastMoveAt: string; // ISO string
};
