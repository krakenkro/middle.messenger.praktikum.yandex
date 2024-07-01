export default class EventBus {
    private listeners: Record<string, Function[]>;

    constructor() {
        this.listeners = {};
    }
  
    on<F extends (...args: any) => void>(event: string, callback: F) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
    
        this.listeners[event]!.push(callback);
    }
  
    off<F extends (...args: any) => void>(event: string, callback: F) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }
  
        this.listeners[event] = this.listeners[event]!.filter(
            listener => listener !== callback
        );
    }
  
    emit<F extends (...args: any) => void>(event: string, ...args: Parameters<F>) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }
      
        this.listeners[event]!.forEach(function(listener) {
            listener(...(args as any[]));
        });
    }
}
