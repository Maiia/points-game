import { inject, Injectable, signal } from '@angular/core';
import { Game, LiveGameState } from '@shared/src/types/gameState';
import { mockGame } from '../mocks/mock-game';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GameService {
    private _game = signal<Game | null>(null);
    game = this._game.asReadonly();
    private _liveGameState = signal<LiveGameState | null>(null);
    liveGameState = this._liveGameState.asReadonly();

    http = inject(HttpClient);

    private socket = new WebSocket('ws://localhost:4001?gameId=game-001');

    getGame(gameId: string) {
        const game = mockGame;
        this._game.set(game!);
    }

    async getLiveGameState(gameId: string): Promise<void> {
        const liveGameState = await firstValueFrom(
            this.http.get<LiveGameState>(`http://localhost:4001/live-game-state/${gameId}`)
        );
        this._liveGameState.set(liveGameState!);
    }

    // TODO consider move dice
    async rollDice(characterId: string) {
        const res = await firstValueFrom(
            this.http.post<LiveGameState>(
                `http://localhost:4001/dice-roll/game/${this.game()!.gameId}`,
                {
                    characterId,
                }
            )
        );
        this._liveGameState.set(res!);
        // this._characterIdToRoll.set(this.opponentId!);
    }

    constructor() {
        this.socket.onmessage = event => {
            const eventData = JSON.parse(event.data);
            this._liveGameState.update(game => {
                const diceRolls = {
                    ...game!.diceRolls,
                    [eventData.data.characterId]: { value: eventData.data.value },
                };
                return { ...game, diceRolls } as LiveGameState;
            });
        };
    }
}
