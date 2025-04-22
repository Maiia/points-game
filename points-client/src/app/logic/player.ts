import { BoardColors, Character, GameState, PlayerState } from '@shared/types/gameState';

const initPlayerWithState = (character: Character): PlayerState => {
    return {
        ...character,
        color: BoardColors.yellow,
        cells: [],
        capturedZones: [],
    };
};

export const addPlayerToGame = (game: GameState, character: Character): GameState => {
    const players = { ...game.players, [character.id]: initPlayerWithState(character) };
    return { ...game, players };
};
