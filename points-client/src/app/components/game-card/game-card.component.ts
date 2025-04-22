import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { GameState } from '@shared/types/gameState';
import { MatCard, MatCardActions, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { GameLobbyService } from '../../services/game-lobby.service';

@Component({
    selector: 'app-game-card',
    imports: [MatCard, MatCardTitle, MatCardContent, MatCardActions, MatIconModule],
    templateUrl: './game-card.component.html',
    styleUrl: './game-card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameCardComponent {
    private gameLobbyService = inject(GameLobbyService);
    game = input.required<GameState>();
    owner = computed(() => this.game().players[Object.keys(this.game().players)[0]]);
    private router = inject(Router);

    onJoinGameClick() {
        this.gameLobbyService.joinGame(this.game().gameId);
        this.router.navigateByUrl(`/game/${this.game().gameId}`);
    }
}
