import { Injectable, signal } from '@angular/core';
import { GameState } from '@shared/types/gameState';
import { mockGames } from '../mocks/mock-games';
import { character } from '../mocks/mock-character';
import { addPlayerToGame } from '../logic/player';

@Injectable({
    providedIn: 'root',
})
export class GameLobbyService {
    private _games = signal<GameState[]>(mockGames);
    games = this._games.asReadonly();

    addGames(game: GameState) {
        this._games.update(games => [...games, game]);
    }

    clearGames() {
        this._games.set([]);
    }

    joinGame(gameId: string): void {
        this._games.update(games => {
            const joinGameIndex = games.findIndex(game => game.gameId === gameId);
            const gameWithPlayers = addPlayerToGame(games[joinGameIndex], character);
            return [
                ...games.slice(0, joinGameIndex),
                gameWithPlayers,
                ...games.slice(joinGameIndex + 1),
            ];
        });
    }
}
