import { BaseTitle, Button, InputField, Link } from '../../components';
import Block from '../../core/Block';
import { loginPattern, passwordPattern } from '../../utils/patterns';

export default class PageLogin extends Block<Record<string, unknown>> {
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
			onClick: (e: MouseEvent) => {
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
					console.log(loginElement.value, passwordElement.value);
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
