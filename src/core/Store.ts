import EventBus from './EventBus.ts';
import { Chat, User, MessageData } from '../utils/types.ts';

export enum StoreEvents {
	Updated = 'updated'
}

export type State = {
	loggedIn: boolean;
	user: User | null;
	chats: Chat[] | null;
	currentChat: Chat | null;
	searchingUsers: User[] | null;
	currentUser: User | null;
	isLoadedFile: boolean;
	fileName: string;
	formData: {};
	searchingLogin: string | null;
	isSearchingUsers: boolean;
	currentChatMessages: MessageData[];
};

function set<K extends keyof State>(
	object: State,
	path: K,
	value: State[K]
): State {
	if (path in object) {
		object[path] = value;
	}
	return object;
}

class Store extends EventBus {
	private _state: State = {
		loggedIn: false,
		user: null,
		chats: null,
		currentChat: null,
		searchingUsers: null,
		currentUser: null,
		isLoadedFile: false,
		fileName: '',
		formData: {},
		searchingLogin: null,
		isSearchingUsers: false,
		currentChatMessages: [],
	};

	public getState(): State {
		return this._state;
	}

	public set(path: any, value: any) {
		set(this._state, path, value);
		this.emit(StoreEvents.Updated);
	}

	public setResetState(): void {
		try {
			this._state = {
				loggedIn: false,
				user: null,
				chats: null,
				currentChat: null,
				searchingUsers: null,
				currentUser: null,
				formData: {},
				isLoadedFile: false,
				fileName: '',
				searchingLogin: null,
				isSearchingUsers: false,
				currentChatMessages: [],
			};
			this.emit(StoreEvents.Updated);
		} catch (e) {
			console.log(e);
		}
	}
}

export default new Store();
