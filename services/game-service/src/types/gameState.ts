export type Position = {
    x: number;
    y: number;
};

export type CellState = {
    owner: string | null;      // characterId або null
    isBlocked: boolean;
    isCaptured: boolean;
};

export type PlayerState = {
    nickname: string;
    color: string;
    cells: Position[];
    capturedZones: Position[];
};

export type GameState = {
    gameId: string;
    board: CellState[][];
    players: {
        [characterId: string]: PlayerState;
    };
    currentTurn: string;          // characterId
    lastDiceRoll: number;
    blockedCells: Position[];
    status: 'waiting' | 'active' | 'finished';
    lastMoveAt: string;           // ISO string
};