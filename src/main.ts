import Handlebars from 'handlebars';
import Router from './core/Router';
import * as Components from './components';
import * as Pages from './pages';
import { renderApp } from './core/RenderApp';
const stubs = {
	items: [
		{
			nickname: 'Камилла',
			lastMessageTime: '17:26',
			lastMessage: 'Пойдем пить чай',
			unreadCount: '3',
			avatarUrl: './assets/images/ava.jpg',
		},
		{
			nickname: 'Алуа',
			lastMessageTime: 'Вс',
			lastMessage: 'Угощайтесь тортиком на кухне',
			unreadCount: '1',
			avatarUrl: './assets/images/ava.jpg',
		},
		{
			nickname: 'Жаслан',
			lastMessageTime: 'Сб',
			lastMessage: 'Посмотри корректировки пожалуйста',
			avatarUrl: './assets/images/ava.jpg',
		},
	],
};

Object.entries(Components).forEach(([name, component]) => {
	Handlebars.registerPartial(name, component.toString());
});

const pageLogin = new Pages.PageLogin({});
const pageRegistration = new Pages.PageRegistration({});
const pageChat = new Pages.PageChat(stubs);
const pageProfile = new Pages.PageProfile({});
const pageEdit = new Pages.PageEdit({});
const changePassword = new Pages.ChangePassword({});
const page500 = new Pages.Page500({});
const page404 = new Pages.Page404({});

Router.use('/', pageLogin)
	.use('/registration', pageRegistration)
	.use('/chat', pageChat)
	.use('/profile', pageProfile)
	.use('/edit', pageEdit)
	.use('/change-password', changePassword)
	.use('/500', page500)
	.use('*', page404)
	.start();

document.addEventListener('DOMContentLoaded', () => renderApp());