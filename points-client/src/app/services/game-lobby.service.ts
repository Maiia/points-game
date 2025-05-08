import { computed, Injectable, signal } from '@angular/core';
import { GameStatus } from '@shared/src/types/gameState';
import { mockGames } from '../mocks/mock-games';
import { mockCharacter } from '../mocks/mock-character';
import { Game } from '@shared/src';

@Injectable({
    providedIn: 'root',
})
export class GameLobbyService {
    private _games = signal<Game[]>(mockGames);

    readonly waitingGames = computed(() =>
        this._games().filter(game => game.status === GameStatus.waiting)
    );

    async joinGame(gameId: string): Promise<boolean> {
        try {
            // this._games.update(games => {
            // TODO rewrite, change logic, return type
            // const joinGameIndex = games.findIndex(game => game.gameId === gameId);
            // const gameWithPlayers = addPlayerToGame(games[joinGameIndex], mockCharacter);
            // const gameWithStatus = changeGameStatus.toSetup(gameWithPlayers);
            // return [
            //     ...games.slice(0, joinGameIndex),
            //     gameWithStatus,
            //     ...games.slice(joinGameIndex + 1),
            // ];
            // return true;
            // });
            return true;
        } catch (e: any) {
            console.log(e);
            throw new Error(e.message);
        }
    }
}
