import Block from '../../core/Block';
import { ChatItem } from '../chat-item/chat-item';

export class ChatItems extends Block<Record<string, unknown>> {
	constructor(props: Record<string, unknown>) {
		super({
			...props,
			lists: [
				new ChatItem({
					nickname: 'Камилла',
					lastMessageTime: '17:26',
					lastMessage: 'Пойдем пить чай',
					unreadCount: '3',
					avatarUrl: './assets/images/ava.jpg',
				}),
			],
		});
	}

	protected render() {
		return `
		<div class="{{className}}">
		{{{lists}}}
		</div>
		`;
	}
}
