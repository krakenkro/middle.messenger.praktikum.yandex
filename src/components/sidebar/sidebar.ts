import Block from '../../core/Block';
import { Button } from '../../components';
import { auth } from '../../services/auth';
import Router from '../../core/Router';

export class Sidebar extends Block<Record<string, unknown>> {
    constructor(props: Record<string, unknown>) {
        super(props);
    }

    protected init(): void {
		const button = new Button({
			text: 'Выйти',
			onClick: async (e: MouseEvent) => {
				try {
                    e.preventDefault();
					await auth.logout();
					Router.go('/');
                } catch (error) {
                    console.error('Ошибка при выходе из аккаунта:', error);
                }
			},
		});

		this.children = {
			...this.children,
			button,
		};
	}

    protected render() {
        return `
            <nav class="sidebar">
                <ul class="sidebar__menu">
                    <li class="sidebar__menu-item">
                        <a href="profile" class="sidebar__menu-link">Профиль</a>
                    </li>
                    <li class="sidebar__menu-item">
                        <a href="chat" class="sidebar__menu-link">Чат</a>
                    </li>
                    <li class="sidebar__menu-item">
                        <a href="edit" class="sidebar__menu-link">Изменить данные</a>
                    </li>
                    <li class="sidebar__menu-item">
                        <a href="change-password" class="sidebar__menu-link">Изменить пароль</a>
                    </li>
                    <li class="sidebar__menu-item">
                        <a href="/" class="sidebar__menu-link">Авторизация</a>
                    </li>
                    <li class="sidebar__menu-item">
                        <a href="registration" class="sidebar__menu-link">Регистрация</a>
                    </li>
                    <li class="sidebar__menu-item">
                        <a href="404" class="sidebar__menu-link">404</a>
                    </li>
                    <li class="sidebar__menu-item">
                        <a href="500" class="sidebar__menu-link">500</a>
                    </li>
                    {{{ button }}}
                </ul>
            </nav>
        `;
    }
}