import { TestBed } from '@angular/core/testing';

import { GameLobbyService } from './game-lobby.service';

describe('GameLobbyService', () => {
    let service: GameLobbyService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(GameLobbyService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    // TODO proceed when backend connected
    it('should join game', () => {
        console.log(service.games());
    });
});
