import { Routes } from '@angular/router';
import { LobbyPageComponent } from './pages/lobby-page/lobby-page.component';
import { GamePageComponent } from './pages/game-page/game-page.component';

export const routes: Routes = [
    {
        path: 'lobby',
        component: LobbyPageComponent,
    },
    {
        path: 'game/:gameId',
        component: GamePageComponent,
    },
];
