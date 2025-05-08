export type Position = {
  x: number;
  y: number;
};

export type CellState = {
  ownerCharacterId: string | null;
  isBlocked: boolean;
  isCaptured: boolean;
};

export type CharacterId = string;
export type DiceRolls = Record<CharacterId, { value: number }>;

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

export type GamePlayerMetadata = Character & {
  color: BoardColors;
};

export type GamePlayers = Record<CharacterId, GamePlayerMetadata>;

export type LivePlayerState = {
  cells: Position[];
  capturedZones: Position[];
};

export enum GameStatus {
  waiting = "waiting",
  setup = "setup",
  active = "active",
  finished = "finished",
}

export type LiveGameState = {
  gameId: string;
  board: CellState[][];
  players: Record<CharacterId, LivePlayerState>;
  currentTurnCharacterId: string;
  diceRolls: DiceRolls;
  lastDiceRollCharacterId: string;
  blockedCells: Position[];
  lastMoveTime: Date;
};

export type BoardSettings = {
  rowsAmount: number;
  cellsAmount: number;
  blockedCellsPosition: Position[];
};

export type Game = {
  gameId: string;
  boardSettings: BoardSettings;
  players: GamePlayers;
  status: GameStatus;
  createdAtTime: Date;
  finishedAtTime: Date;
  winnerCharacterId: string | null;
};
