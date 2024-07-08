import Handlebars from "handlebars";
import * as Components from "./components";
import * as Pages from "./pages";
import Block from "./core/Block";

type ClassConstructor<T = any> = new (...args: any[]) => T;
const stubs = {
	items: [
		{
			nickname: "Камилла",
			lastMessageTime: "17:26",
			lastMessage: "Пойдем пить чай",
			unreadCount: "3",
			avatarUrl: "./assets/images/ava.jpg",
		},
		{
			nickname: "Алуа",
			lastMessageTime: "Вс",
			lastMessage: "Угощайтесь тортиком на кухне",
			unreadCount: "1",
			avatarUrl: "./assets/images/ava.jpg",
		},
		{
			nickname: "Жаслан",
			lastMessageTime: "Сб",
			lastMessage: "Посмотри корректировки пожалуйста",
			avatarUrl: "./assets/images/ava.jpg",
		},
	],
};
const pages: Record<
	string,
	[ClassConstructor, Record<string, unknown | undefined>]
> = {
	404: [Pages.Page404, {}],
	500: [Pages.Page500, {}],
	login: [Pages.PageLogin, {}],
	registration: [Pages.PageRegistration, {}],
	chat: [Pages.PageChat, stubs],
	profile: [Pages.PageProfile, {}],
	edit: [Pages.PageEdit, {}],
	"change-password": [Pages.ChangePassword, {}],
};

Object.entries(Components).forEach(([name, component]) => {
	Handlebars.registerPartial(name, component.toString());
});

function navigate(page: string): void {
	const [source, context] = pages[page];
	const container = document.getElementById("app");

	if (source instanceof Object) {
		// eslint-disable-next-line no-shadow, new-cap
		const page = new source(context) as Block<Record<string, unknown>>;
		if (container !== null) {
			container.innerHTML = "";
			container.append(page.getContent() as Node);
			page.dispatchComponentDidMount();
		}
		return;
	}

	if (container !== null)
		container.innerHTML = Handlebars.compile(source)(context);
}

document.addEventListener("DOMContentLoaded", () => {
	const page = window.location.pathname.substring(1);
	if (page) {
		navigate(page);
	} else {
		navigate("chat");
	}
});
document.addEventListener("click", (e: MouseEvent) => {
	const page = (e.target as HTMLElement).getAttribute("page");

	if (page) {
		window.location.pathname = page;

		e.preventDefault();
		e.stopImmediatePropagation();
	}
});
