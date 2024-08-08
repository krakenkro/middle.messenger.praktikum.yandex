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
		console.log(this.lists);
	}

	// protected init(): void {
	//     const chatItems = this.lists.chatitems.reduce((list: Record<string, any> = {}, chatData) => {
	//         console.log(chatData)
	//         const component: ChatItem = new ChatItem({ nickname: 'Камилла', lastMessageTime: '17:26', lastMessage: 'Пойдем пить чай', unreadCount: '3', avatarUrl: '/ava.jpg'})
	//         list[component._id] = component
	//         return list
	//         }, {})
	//       this.children = {
	//         ...this.children,
	//         ...chatItems
	//       }
	// }

	protected render() {
		return `
		<div class="{{className}}">
		{{{lists}}}
		</div>
		`;
	}
}
// import Block from "../../core/Block";
// import { ChatItem } from "../chat-item/chat-item";
// import './chat-items.scss';
// interface ChatItemProps {
//     _id: string;
//     nickname: string;
//     lastMessageTime: string;
//     lastMessage: string;
//     unreadCount: string;
//     avatarUrl: string;
// }
// interface ChatItemsProps {
//     chatitems: ChatItemProps[];
//     className?: string;
// }
// export class ChatItems extends Block<ChatItemsProps> {
//     constructor(props: ChatItemsProps) {
//         const chatItems = props.chatitems.reduce((list: Record<string, any> = {}, chatData) => {
//             console.log(chatData)
//             const component: ChatItem = new ChatItem({ nickname: 'Камилла', lastMessageTime: '17:26', lastMessage: 'Пойдем пить чай', unreadCount: '3', avatarUrl: '/ava.jpg'})
//             list[component._id] = component
//             return list
//           }, {})
//           console.log(chatItems)
//         super({
//             ...props,
//         });
//         this.children = {
//             ...this.children,
//             ...chatItems
//         }
//     }

//     // protected init(): void {

//     //       this.children = {
//     //         ...this.children
//     //       }
//     // }

//     protected render() {
//         return `
//         <div class="{{className}}">
//             {{{chatItems}}}
//         </div>
//         `;
//     }
// }
