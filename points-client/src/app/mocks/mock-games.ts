import { BoardColors, GameState } from '@shared/types/gameState';

import type { CellState, Position } from '@shared/types/gameState';

function generateEmptyBoard(
    width: number,
    height: number,
    blocked: Position[] = []
): CellState[][] {
    const board: CellState[][] = [];

    for (let y = 0; y < height; y++) {
        const row: CellState[] = [];
        for (let x = 0; x < width; x++) {
            const isBlocked = blocked.some(cell => cell.x === x && cell.y === y);
            row.push({
                owner: null,
                isBlocked,
                isCaptured: false,
            });
        }
        board.push(row);
    }

    return board;
}

export const mockGames: GameState[] = [
    {
        gameId: 'game-001',
        board: generateEmptyBoard(10, 10, [
            { x: 3, y: 4 },
            { x: 6, y: 2 },
        ]),
        players: {
            'char-123': {
                id: 'char-123',
                userId: 'userId-123',
                nickname: 'KateTheBrave',
                rating: 99,
                color: BoardColors.blue,
                cells: [{ x: 0, y: 0 }],
                capturedZones: [],
            },
        },
        currentTurn: 'char-123',
        lastDiceRoll: 4,
        blockedCells: [
            { x: 3, y: 4 },
            { x: 6, y: 2 },
        ],
        status: 'waiting',
        lastMoveAt: new Date().toISOString(),
    },
    {
        gameId: 'game-002',
        board: generateEmptyBoard(15, 10, [
            { x: 1, y: 1 },
            { x: 2, y: 2 },
            { x: 3, y: 3 },
        ]),
        players: {
            'char-456': {
                id: 'char-456',
                userId: 'userId-456',
                nickname: 'PlayerTwo',
                rating: 33,
                color: BoardColors.blue,
                cells: [{ x: 5, y: 5 }],
                capturedZones: [],
            },
        },
        currentTurn: 'char-456',
        lastDiceRoll: 3,
        blockedCells: [
            { x: 1, y: 1 },
            { x: 2, y: 2 },
            { x: 3, y: 3 },
        ],
        status: 'waiting',
        lastMoveAt: new Date().toISOString(),
    },
];
