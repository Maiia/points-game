import { Component, inject, input } from '@angular/core';
import { GameStatus } from '@shared/src/types/gameState';
import { Game } from '@shared/src';
import { CharacterService } from '../../services/character.service';

@Component({
    selector: 'app-game-overview',
    imports: [],
    templateUrl: './game-overview.component.html',
    styleUrl: './game-overview.component.scss',
})
export class GameOverviewComponent {
    game = input.required<Game>();
    protected readonly GameStatus = GameStatus;
    characterService = inject(CharacterService);
}
