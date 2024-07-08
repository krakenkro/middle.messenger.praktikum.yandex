import { Avatar, Input, Button } from '..';
import Block from '../../core/Block';
import './chat-window.scss';

export class ChatWindow extends Block<Record<string, unknown>> {
	constructor(props: Record<string, unknown>) {
		super({
			...props
		});
	}

	protected init(): void {
		const avatar = new Avatar({
			imageUrl: '../../assets/images/ava.jpg',
			size: 'medium'
		});

		const input = new Input({
			className: 'chat-window__form-input',
			type: 'text',
			name: 'message'
		});

		const button = new Button({
			text: 'Отправить'
		});

		this.children = {
			...this.children,
			avatar,
			input,
			button
		};
	}

	protected render() {
		return `
        <div class="chat-window">
            <div class="chat-window__header">
                <div class="chat-window__user-info">
                    {{{avatar}}}
                    <span class="user-info__username">{{nickname}}</span>
                </div>
                <button class="chat-window__menu">
                    <img src="../../assets/images/menu.png" alt="burger">
                </button>
            </div>
            <div class="chat-window__area">
                <div class="chat-window__message chat-window__message_received">
                    <span class="chat-window__message-content">Угощайтесь тортиком на кухне</span>
                    <span class="chat-window__message-time">12:53</span>
                </div>
                <div class="chat-window__message chat-window__message_sent">
                    <span class="chat-window__message-content">Рахмет</span>
                    <span class="chat-window__message-time">12:54</span>
                </div>
            </div>
            <form class="chat-window__form">
                <button class="chat-window__form-paperclip">
                    <img src="../../assets/images/paperclip.png" alt="paperclip">
                </button>
                {{{ input }}}
                {{{button}}}
            </form>
        </div>
        `;
	}
}
