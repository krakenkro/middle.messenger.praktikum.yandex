import { ChatItems, ChatWindow, Input, Sidebar } from "../../components";
import Block from "../../core/Block";
import "./chat.scss";

export default class PageChat extends Block<Record<string, unknown>> {
	constructor(props: Record<string, unknown>) {
		super({
			...props,
		});
	}

	protected init(): void {
		const sidebar = new Sidebar({});

		const input = new Input({
			className: "input-field__element",
			type: "text",
			name: "search",
			placeholder: "Поиск...",
		});

		const chatItems = new ChatItems({
			className: "chats",
			// chatitems: this.lists.items
		});

		const chatWindow = new ChatWindow({
			ickname: "Алуа",
		});

		this.children = {
			...this.children,
			sidebar,
			input,
			chatItems,
			chatWindow,
		};
	}

	protected render() {
		return `
        <section class="chat-page">
            {{{sidebar}}}
            <div class="chat-list">
                {{{input}}}
                {{{chatItems}}}
            </div>
            {{{chatWindow}}}
        </section>
        `;
	}
}
