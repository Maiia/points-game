import { effect, inject, Injectable, Injector, runInInjectionContext, signal } from '@angular/core';
import { Game, LiveGameState } from '@shared/src/types/gameState';
import { mockGame } from '../mocks/mock-game';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { GameSocketService } from './game-socket.service';

@Injectable({
    providedIn: 'root',
})
export class GameService {
    private gameSocketService = inject(GameSocketService);
    private _game = signal<Game | null>(null);
    game = this._game.asReadonly();
    private _liveGameState = signal<LiveGameState | null>(null);
    liveGameState = this._liveGameState.asReadonly();

    http = inject(HttpClient);
    private injector = inject(Injector);

    getGame(gameId: string) {
        const game = mockGame;
        this._game.set(game!);
    }

    async startGame(gameId: string): Promise<void> {
        this.getGame(gameId);
        this.gameSocketService.connectToGame(gameId);
        this.subscribeToSocket();
        const liveGameState = await firstValueFrom(
            this.http.get<LiveGameState>(`http://localhost:4001/live-game-state/${gameId}`)
        );
        this._liveGameState.set(liveGameState!);
    }

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

    subscribeToSocket() {
        runInInjectionContext(this.injector, () => {
            effect(() => {
                const diceRollValue = this.gameSocketService.diceRollValue();
                if (diceRollValue) {
                    this._liveGameState.update(state => {
                        const diceRolls = {
                            ...state!.diceRolls,
                            [diceRollValue.characterId]: { value: diceRollValue.value },
                        };
                        return { ...state, diceRolls } as LiveGameState;
                    });
                }
            });
        });
    }
}
