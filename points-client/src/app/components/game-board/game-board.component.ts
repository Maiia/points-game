import { Component, computed, input, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';
import { LiveGameState } from '@shared/src';

@Component({
    selector: 'app-game-board',
    imports: [NgStyle],
    templateUrl: './game-board.component.html',
    styleUrl: './game-board.component.scss',
})
export class GameBoardComponent implements OnInit {
    liveGameState = input.required<LiveGameState>();

    ngOnInit() {
        console.log(this.liveGameState());
    }

    readonly columns = computed(() => this.liveGameState().board[0].length);
    readonly rows = computed(() => this.liveGameState().board.length);

    // TODO implement responsive board
    readonly boardStyle = computed(() => {
        const cols = this.columns();
        const rows = this.rows();

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const maxCellWidth = viewportWidth / cols;
        const maxCellHeight = viewportHeight / rows;

        const cellSize = Math.min(maxCellWidth, maxCellHeight);

        return {
            'grid-template-columns': `repeat(${cols}, ${cellSize}px)`,
            'grid-template-rows': `repeat(${rows}, ${cellSize}px)`,
        };
    });
}
