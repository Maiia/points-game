import { Component, inject, input } from '@angular/core';
import { MatCardActions } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';
import { CharacterService } from '../../services/character.service';
import { DiceRolls } from '@shared/src';

@Component({
    selector: 'app-dice-area',
    imports: [MatCardActions, CommonModule],
    templateUrl: './dice-area.component.html',
    styleUrl: './dice-area.component.scss',
})
export class DiceAreaComponent {
    diceRolls = input.required<DiceRolls>();
    gameService = inject(GameService);
    characterService = inject(CharacterService);

    onRollDiceClick() {
        this.characterService.setCharacterIdToRoll(this.characterService.opponent()!.id);
        this.gameService.rollDice(this.characterService.characterId()!);
    }
}
