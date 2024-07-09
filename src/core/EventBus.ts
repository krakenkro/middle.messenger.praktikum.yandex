type EventCallback<Args extends any[] = any[]> = (...args: Args) => void;

export default class EventBus {
	private listeners: Record<string, EventCallback[]>;

	constructor() {
		this.listeners = {};
	}

	on<Event extends string, Callback extends EventCallback>(
		event: Event,
		callback: Callback,
	): void {
		if (!this.listeners[event]) {
			this.listeners[event] = [];
		}

		this.listeners[event]!.push(callback);
	}

	off<Event extends string, Callback extends EventCallback>(
		event: Event,
		callback: Callback,
	): void {
		if (!this.listeners[event]) {
			throw new Error(`Нет события: ${event}`);
		}

		this.listeners[event] = this.listeners[event]!.filter(
			(listener) => listener !== callback,
		);
	}

	emit<Event extends string, Args extends any[]>(
		event: Event,
		...args: Args
	): void {
		if (!this.listeners[event]) {
			throw new Error(`Нет события: ${event}`);
		}

		this.listeners[event]!.forEach((listener) => {
			listener(...(args as any[]));
		});
	}
}
