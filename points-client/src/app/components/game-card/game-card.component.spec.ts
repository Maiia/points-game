import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCardComponent } from './game-card.component';
import { mockGames } from '../../mocks/mock-games';
import { GameLobbyService } from '../../services/game-lobby.service';
import { Router } from '@angular/router';

describe('GameCardComponent', () => {
    let component: GameCardComponent;
    let fixture: ComponentFixture<GameCardComponent>;
    const routerMock = {
        navigateByUrl: jest.fn(),
    };
    const gameLobbyServiceMock = {
        joinGame: jest.fn(),
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [GameCardComponent],
            providers: [
                { provide: Router, useValue: routerMock },
                { provide: GameLobbyService, useValue: gameLobbyServiceMock },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(GameCardComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('game', mockGames[0]);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should correctly compute owner values', () => {
        const owner = component.owner();
        expect(owner.nickname).toEqual(mockGames[0].players[owner.id].nickname);
        expect(owner.rating).toEqual(mockGames[0].players[owner.id].rating);
    });

    it('should call onJoinGameClick and navigate to game', () => {
        component.onJoinGameClick();
        expect(gameLobbyServiceMock.joinGame).toHaveBeenCalledWith(mockGames[0].gameId);
        expect(routerMock.navigateByUrl).toHaveBeenCalledWith(`/game/${mockGames[0].gameId}`);
    });
});
