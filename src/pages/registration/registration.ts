import { BaseTitle, Button, InputField, Link } from '../../components';
import Block from '../../core/Block';
import {
	loginPattern,
	passwordPattern,
	emailPattern,
	namePattern,
	phonePattern,
} from '../../utils/patterns';

export default class PageRegistration extends Block<Record<string, unknown>> {
	constructor(props: Record<string, unknown>) {
		super({
			...props,
			baseTitle: new BaseTitle({
				title: 'Регистрация',
			}),
		});
	}

	protected init(): void {
		const createInputField = (
			title: string,
			name: string,
			pattern: string,
			type: string = 'text',
		): InputField =>
			new InputField({
				className: 'auth-form__input',
				title,
				name,
				type,
				pattern,
			});

		const inputFields = {
			inputFieldEmail: createInputField('Email', 'email', emailPattern),
			inputFieldFirstName: createInputField(
				'Имя',
				'first_name',
				namePattern,
			),
			inputFieldSecondName: createInputField(
				'Фамилия',
				'second_name',
				namePattern,
			),
			inputFieldLogin: createInputField('Логин', 'login', loginPattern),
			inputFieldPhone: createInputField(
				'Номер телефона',
				'phone',
				phonePattern,
			),
			inputFieldPassword: createInputField(
				'Пароль',
				'password',
				passwordPattern,
				'password',
			),
			inputFieldPasswordRepeat: createInputField(
				'Повторите пароль',
				'password_repeat',
				passwordPattern,
				'password',
			),
		};

		const button = new Button({
			text: 'Зарегистрироваться',
			onClick: (e: MouseEvent) => {
				e.preventDefault();

				const inputs = Object.values(inputFields).map((field) => ({
					element: field
						.getContent()
						.querySelector('input') as HTMLInputElement,
					field,
				}));

				let isFormValid = true;

				inputs.forEach(({ element, field }) => {
					const isValid = field.validate(element);
					if (!isValid) {
						isFormValid = false;
					}
				});

				if (isFormValid) {
					console.log(inputs.map(({ element }) => element.value));
				}
			},
		});

		const link = new Link({
			text: 'Авторизоваться',
			page: 'login',
		});

		this.children = {
			...this.children,
			...inputFields,
			button,
			link,
		};
	}

	protected render() {
		return `
        <section class="container">
            <form class="auth-form">
                {{{baseTitle}}}
                {{{inputFieldEmail}}}
                {{{inputFieldFirstName}}}
                {{{inputFieldSecondName}}}
                {{{inputFieldLogin}}}
                {{{inputFieldPhone}}}
                {{{inputFieldPassword}}}
                {{{inputFieldPasswordRepeat}}}
                {{{button}}}
                {{{link}}}
            </form> 
        </section>
        `;
	}
}
