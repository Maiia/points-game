import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbyPageComponent } from './lobby-page.component';
import { GameCardComponent } from '../../components/game-card/game-card.component';

describe('LobbyPageComponent', () => {
    let component: LobbyPageComponent;
    let fixture: ComponentFixture<LobbyPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LobbyPageComponent, GameCardComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(LobbyPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
