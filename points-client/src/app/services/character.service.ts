import { computed, inject, Injectable, signal } from '@angular/core';
import { GameService } from './game.service';

@Injectable({
    providedIn: 'root',
})
export class CharacterService {
    gameService = inject(GameService);
    private _characterId = signal<string | null>(null);
    characterId = this._characterId.asReadonly();

    setCharacterId(characterId: string) {
        this._characterId.set(characterId);
    }

    character = computed(() => {
        if (!this.gameService.game() || !this.characterId()) {
            return null;
        }
        return this.gameService.game()!.players[this.characterId()!];
    });

    opponent = computed(() => {
        if (!this.gameService.game() || !this.characterId()) {
            return null;
        }

        const opponentId = Object.keys(this.gameService.game()!.players).find(
            id => id !== this.characterId()
        );
        return this.gameService.game()!.players[opponentId!];
    });

    private _characterIdToRoll = signal<string | null>(null);
    characterIdToRoll = this._characterIdToRoll.asReadonly();

    setCharacterIdToRoll(characterId: string) {
        this._characterIdToRoll.set(characterId);
    }

    readonly isCharacterTurnToRoll = computed(
        () => this.characterIdToRoll() === this.characterId()
    );

    constructor() {}
}
