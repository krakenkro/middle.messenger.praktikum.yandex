import Block from '../../core/Block';

export class Sidebar extends Block<Record<string, unknown>> {
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
                        <a href="login" class="sidebar__menu-link">Авторизация</a>
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
                </ul>
            </nav>
        `;
    }
}
