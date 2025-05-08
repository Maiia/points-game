import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MatCard, MatCardActions, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { GameLobbyService } from '../../services/game-lobby.service';
import { Game } from '@shared/src';

// TODO rename to LOBBY game card
@Component({
    selector: 'app-game-card',
    imports: [MatCard, MatCardTitle, MatCardContent, MatCardActions, MatIconModule],
    templateUrl: './game-card.component.html',
    styleUrl: './game-card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameCardComponent {
    private gameLobbyService = inject(GameLobbyService);
    game = input.required<Game>();
    owner = computed(() => this.game().players[Object.keys(this.game().players)[0]]);
    private router = inject(Router);

    async onJoinGameClick() {
        const joinGameSuccess = await this.gameLobbyService.joinGame(this.game().gameId);
        if (joinGameSuccess) {
            this.router.navigateByUrl(`/game/${this.game().gameId}`);
        } else {
            throw new Error('Failed to join the game. Please try again later.');
        }
    }
}
