import { Component, inject, OnInit } from '@angular/core';
import { GameOverviewComponent } from '../../components/game-overview/game-overview.component';
import { GameBoardComponent } from '../../components/game-board/game-board.component';
import { DiceAreaComponent } from '../../components/dice-area/dice-area.component';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../services/game.service';
import { CharacterService } from '../../services/character.service';

@Component({
    selector: 'app-game-page',
    imports: [GameOverviewComponent, GameBoardComponent, DiceAreaComponent],
    templateUrl: './game-page.component.html',
    styleUrl: './game-page.component.scss',
})
export class GamePageComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private gameId = this.route.snapshot.paramMap.get('gameId');
    gameService = inject(GameService);
    characterService = inject(CharacterService);

    // TODO why promise?....
    ngOnInit(): void {
        this.characterService.setCharacterId(this.route.snapshot.paramMap.get('characterId')!);
        this.initGame();
    }
    private async initGame() {
        this.gameService.getGame(this.gameId!);
        await this.gameService.startGame(this.gameId!);
    }
}
