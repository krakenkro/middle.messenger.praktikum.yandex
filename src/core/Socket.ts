import EventBus from './EventBus';

class WebSocketService extends EventBus {
    private socket: WebSocket | null = null;
    private readonly url: string;
    private pingInterval: number | null = null;

    constructor(url: string) {
        super();
        this.url = url;
    }

    public connect() {
        this.socket = new WebSocket(this.url);

        this.socket.addEventListener('open', this.onOpen.bind(this));
        this.socket.addEventListener('close', this.onClose.bind(this));
        this.socket.addEventListener('message', this.onMessage.bind(this));
        this.socket.addEventListener('error', this.onError.bind(this));

        // Пинговать сервер каждые 30 секунд
        this.pingInterval = window.setInterval(() => {
            if (this.socket && this.socket.readyState === WebSocket.OPEN) {
                this.socket.send(JSON.stringify({ type: 'ping' }));
            }
        }, 30000);
    }

    public disconnect() {
        if (this.socket) {
            this.socket.close();
        }
        if (this.pingInterval) {
            clearInterval(this.pingInterval);
            this.pingInterval = null;
        }
    }

    public send(data: unknown) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(data));
        } else {
            console.error('WebSocket is not open. Ready state:', this.socket?.readyState);
        }
    }

    private onOpen(event: Event) {
        console.log('WebSocket connection opened:', event);
        this.emit('open');
    }

    private onClose(event: CloseEvent) {
        console.log('WebSocket connection closed:', event);
        this.emit('close');
        this.reconnect();
    }

    private onMessage(event: MessageEvent) {
        const data = JSON.parse(event.data);
        console.log('WebSocket message received:', data);
        this.emit('message', data);
    }

    private onError(event: Event) {
        console.error('WebSocket error:', event);
        this.emit('error', event);
    }

    private reconnect() {
        console.log('Reconnecting WebSocket...');
        setTimeout(() => {
            this.connect();
        }, 5000);
    }
}

export default WebSocketService;
