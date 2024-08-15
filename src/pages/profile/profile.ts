import { Avatar, Link, Sidebar } from '../../components';
import Block from '../../core/Block';
import { connect } from '../../core/HOC';
import { State } from '../../core/Store';
import './profile.scss';

class PageProfile extends Block<Record<string, unknown>> {
	constructor(props: Record<string, unknown>) {
		super({ ...props });
	}

	protected init(): void {
		const createLinks = (text: string, page: string): Link => new Link({ text, page });

		const links = {
			linkEdit: createLinks('Изменить данные', 'edit'),
			linkChangePassword: createLinks('Изменить пароль', 'change-password'),
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
        const { email, login, first_name, second_name, display_name, phone } = this.props;

        return `
        <section class="profile">
            {{{ sidebar }}}
            <div class="profile__wrapper">
                <div class="profile__header">
                    {{{ avatar }}}
                    <h1 class="profile-username">${first_name}</h1>
                </div>
                <div class="profile__info">
                    <div class="profile__info-item">
                        <span class="profile__info-label">Почта:</span>
                        <span class="profile__info-value">${email}</span>
                    </div>
                    <div class="profile__info-item">
                        <span class="profile__info-label">Логин:</span>
                        <span class="profile__info-value">${login}</span>
                    </div>
                    <div class="profile__info-item">
                        <span class="profile__info-label">Имя:</span>
                        <span class="profile__info-value">${first_name}</span>
                    </div>
                    <div class="profile__info-item">
                        <span class="profile__info-label">Фамилия:</span>
                        <span class="profile__info-value">${second_name}</span>
                    </div>
                    <div class="profile__info-item">
                        <span class="profile__info-label">Имя в чате:</span>
                        <span class="profile__info-value">${display_name}</span>
                    </div>
                    <div class="profile__info-item">
                        <span class="profile__info-label">Телефон:</span>
                        <span class="profile__info-value">${phone}</span>
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

const mapStateToProps = (state: State) => ({
    email: state.user?.email,
    login: state.user?.login,
    first_name: state.user?.first_name,
    second_name: state.user?.second_name,
    display_name: state.user?.display_name,
    phone: state.user?.phone,
    avatar: state.user?.avatar,
});

export default connect(mapStateToProps)(PageProfile);
