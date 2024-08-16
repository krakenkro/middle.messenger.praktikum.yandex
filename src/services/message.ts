import Socket, { Message, WebSocketProps } from '../core/Socket.ts';
import store from '../core/Store.ts';
import { MessageData } from '../utils/types';
import { chatApi } from '../api/chatApi.ts';

export default class MessageService {
	static __instance: MessageService | undefined;

	protected socket: Socket | null = null;

	protected socketProps: WebSocketProps = {
		userId: 0,
		chatId: 0,
		token: '',
		callbackMessages: (data: MessageData | MessageData[]): void => {
			this.addMessage(data);
		}
	};

	constructor() {
		if (MessageService.__instance) {
			return MessageService.__instance;
		}

		MessageService.__instance = this;
	}

	async getUserToken(chatId: number) {
		const response = await chatApi.getUserToken(chatId);

		return response.token;
	}

	async connect() {
		const { user, currentChat } = store.getState();
		if (user && currentChat) {
			this.socketProps.userId = user.id;
			this.socketProps.chatId = currentChat.id;

			this.socketProps.token = await this.getUserToken(currentChat.id);

			this.socket = new Socket(this.socketProps);
		}
	}

	disconnect() {
		this.socket?.closeConnect();
	}

	sendMessage(mess: Message) {
		this.socket?.send(mess);
	}

	async addMessage(message: MessageData | MessageData[]) {
		const { currentChatMessages } = store.getState();
		let newChatMessages: MessageData[];

		if (Array.isArray(message)) {
			newChatMessages = [...message].reverse();
		} else {
			newChatMessages = [...currentChatMessages, message];
		}

		store.set('currentChatMessages', newChatMessages);

		const chatMessages = document.querySelector('.chat-window__area');
		if (chatMessages !== null) {
			chatMessages.scrollTop = chatMessages.scrollHeight;
		}
	}
}

export const messageService = new MessageService();
