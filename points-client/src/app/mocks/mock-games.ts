import { BoardColors, CellState, GameStatus, Position } from '@shared/src/types/gameState';
import { Game } from '@shared/src';

export const mockGames: Game[] = [
    {
        gameId: 'game-001',
        boardSettings: {
            rowsAmount: 10,
            cellsAmount: 11,
            blockedCellsPosition: [{ x: 3, y: 5 }],
        },
        // board: generateEmptyBoard(10, 10, [
        //     { x: 3, y: 4 },
        //     { x: 6, y: 2 },
        // ]),
        players: {
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
    },
    {
        gameId: 'game-002',
        boardSettings: {
            rowsAmount: 10,
            cellsAmount: 11,
            blockedCellsPosition: [{ x: 3, y: 5 }],
        },
        players: {
            'char-456': {
                id: 'char-456',
                userId: 'userId-456',
                nickname: 'PlayerTwo',
                rating: 33,
                color: BoardColors.blue,
            },
        },
        status: GameStatus.waiting,
        createdAtTime: new Date(),
        finishedAtTime: new Date(),
        winnerCharacterId: null,
    },
];
