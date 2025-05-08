import { BoardColors, Game, GameStatus } from '@shared/src';

export const mockGame: Game = {
    gameId: 'game-001',
    boardSettings: {
        rowsAmount: 10,
        cellsAmount: 11,
        blockedCellsPosition: [{ x: 3, y: 5 }],
    },
    players: {
        'char-001': {
            nickname: 'FoxyKetty',
            rating: 1111,
            id: 'char-001',
            userId: 'userId-001',
            color: BoardColors.yellow,
        },
        'char-123': {
            id: 'char-123',
            userId: 'userId-123',
            nickname: 'KateTheBrave',
            rating: 99,
            color: BoardColors.blue,
        },
    },
    status: GameStatus.waiting,
    createdAtTime: new Date(),
    finishedAtTime: new Date(),
    winnerCharacterId: null,
};
