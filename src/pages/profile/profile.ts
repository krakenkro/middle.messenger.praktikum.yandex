import { Avatar, Link, Sidebar } from '../../components';
import Block from '../../core/Block';
import './profile.scss';

export default class PageProfile extends Block<Record<string, unknown>> {
	constructor(props: Record<string, unknown>) {
		super({
			...props,
		});
	}

	protected init(): void {
		const createLinks = (text: string, page: string): Link =>
			new Link({
				text,
				page,
			});
		const links = {
			linkEdit: createLinks('Изменить данные', 'edit'),
			linkChangePassword: createLinks(
				'Изменить пароль',
				'change-password',
			),
			linkLogout: createLinks('Выйти', 'login'),
		};
		const sidebar = new Sidebar({});
		const avatar = new Avatar({
			imageUrl: '../../assets/images/ava.jpg',
			size: 'medium',
		});

		this.children = {
			...this.children,
			...links,
			sidebar,
			avatar,
		};
	}

	protected render() {
		return `
        <section class="profile">
        {{{ sidebar }}}
        <div class="profile__wrapper">
            <div class="profile__header">
                {{{ avatar }}}
                <h1 class="profile-username">Иван</h1>
            </div>
            <div class="profile__info">
                <div class="profile__info-item">
                    <span class="profile__info-label">Почта:</span>
                    <span class="profile__info-value">pochta@yandex.ru</span>
                </div>
                <div class="profile__info-item">
                    <span class="profile__info-label">Логин:</span>
                    <span class="profile__info-value">ivanivanov</span>
                </div>
                <div class="profile__info-item">
                    <span class="profile__info-label">Имя:</span>
                    <span class="profile__info-value">Иван</span>
                </div>
                <div class="profile__info-item">
                    <span class="profile__info-label">Фамилия:</span>
                    <span class="profile__info-value">Иванов</span>
                </div>
                <div class="profile__info-item">
                    <span class="profile__info-label">Имя в чате:</span>
                    <span class="profile__info-value">Иван</span>
                </div>
                <div class="profile__info-item">
                    <span class="profile__info-label">Телефон:</span>
                    <span class="profile__info-value">+7 (909) 967 30 30</span>
                </div>
            </div>
            <div class="profile__actions">
                {{{ linkEdit }}}
                {{{ linkChangePassword }}}
                {{{ linkLogout }}}
            </div>
        </div>
    </section>
        `;
	}
}
