import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GameLobbyService } from '../../services/game-lobby.service';
import { GameCardComponent } from '../../components/game-card/game-card.component';

@Component({
    selector: 'app-lobby-page',
    imports: [GameCardComponent],
    templateUrl: './lobby-page.component.html',
    styleUrl: './lobby-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LobbyPageComponent {
    lobby = inject(GameLobbyService);
}
