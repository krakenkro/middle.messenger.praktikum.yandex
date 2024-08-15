import { BaseTitle, Button, InputField, Link } from '../../components';
import Block from '../../core/Block';
import { loginPattern, passwordPattern } from '../../utils/patterns';
import { auth } from '../../services/auth';
import { connect } from '../../core/HOC';
import { State } from '../../core/Store';

const mapStateToProps = (state: State) => {
    return {
        user: state.user,
    };
};

class PageLogin extends Block<Record<string, unknown>> {
	constructor(props: Record<string, unknown>) {
		super({ ...props, baseTitle: new BaseTitle({ title: 'Авторизация' }) });
	}

	protected init(): void {
		const inputFieldLogin = new InputField({
			className: 'auth-form__input',
			title: 'Логин',
			name: 'login',
			pattern: loginPattern,
		});

		const inputFieldPassword = new InputField({
			className: 'auth-form__input',
			title: 'Пароль',
			name: 'password',
			type: 'password',
			pattern: passwordPattern,
		});

		const button = new Button({
			text: 'Войти',
			onClick: async (e: MouseEvent) => {
				e.preventDefault();
				const loginElement = inputFieldLogin
					.getContent()
					.querySelector('input') as HTMLInputElement;
				const passwordElement = inputFieldPassword
					.getContent()
					.querySelector('input') as HTMLInputElement;

				const isLoginValid = inputFieldLogin.validate(loginElement);
				const isPasswordValid = inputFieldPassword.validate(passwordElement);

				if (isLoginValid && isPasswordValid) {
					const login = loginElement.value;
					const password = passwordElement.value;
					await auth.signin({ login, password });
				}
			},
		});

		const link = new Link({
			text: 'Зарегистрироваться',
			page: 'registration',
		});

		this.children = { ...this.children, inputFieldLogin, inputFieldPassword, button, link };
	}

	protected render() {
		return `
        <section class="container">
            <form class="auth-form">
                {{{baseTitle}}}
                {{{inputFieldLogin}}}
                {{{inputFieldPassword}}}
                {{{button}}}
                {{{link}}}
            </form> 
        </section>
        `;
	}
}
export default connect(mapStateToProps)(PageLogin);