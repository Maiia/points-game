import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class GameSocketService {
    private socket: WebSocket | null = null;
    // TODO replace type any
    private _diceRollValue = signal<any | null>(null);
    diceRollValue = this._diceRollValue.asReadonly();

    connectToGame(gameId: string) {
        if (this.socket?.readyState === WebSocket.OPEN) {
            return;
        }
        // TODO should be another endpoint
        this.socket = new WebSocket(`ws://localhost:4001?gameId=${gameId}`);

        this.socket.onopen = () => {
            console.log('🟢 WebSocket connected');
        };
        this.socket.onmessage = event => {
            try {
                const eventData = JSON.parse(event.data);
                console.log(eventData.event);
                if (eventData.event === 'diceRolled') {
                    this._diceRollValue.set(eventData.data);
                }
            } catch (e) {
                console.error('❌ WebSocket parse error:', e);
            }
        };

        this.socket.onerror = err => {
            console.log('🔴 WebSocket error:', err);
        };

        this.socket.onclose = () => {
            console.log('🟡 WebSocket closed');
            this.socket = null;
        };
    }

    disconnectFromGame() {
        if (this.socket?.readyState === WebSocket.CLOSED) {
            this.socket?.close();
        }
        this.socket = null;
    }
}
