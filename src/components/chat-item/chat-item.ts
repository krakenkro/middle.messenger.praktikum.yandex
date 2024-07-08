import { Avatar } from "..";
import Block from "../../core/Block";
import "./chat-item.scss";

export class ChatItem extends Block<Record<string, unknown>> {
	constructor(props: Record<string, unknown>) {
		super({
			...props,
		});
	}

	protected init(): void {
		const avatar = new Avatar({
			imageUrl: this.props.avatarUrl,
			size: "medium",
		});

		this.children = {
			...this.children,
			avatar,
		};
	}

	protected render() {
		return `
        <div class="chat-item" data-nickname="{{nickname}}">
            ${this.props.avatarUrl ? "{{{ avatar }}}" : ""}
            <div class="chat-item__info">
                <div class="chat-item__name">{{nickname}}</div>
                <div class="chat-item__time">{{lastMessageTime}}</div>
                <div class="chat-item__message">{{lastMessage}}</div>
                {{#if unreadCount}}
                    <div class="chat-item__count">
                        <span>{{unreadCount}}</span>
                    </div>
                {{/if}}
            </div>
        </div>
        `;
	}
}
