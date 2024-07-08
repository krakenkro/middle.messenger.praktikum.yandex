import { BaseTitle, Button, InputField, Sidebar } from '../../components';
import Block from '../../core/Block';
import {
	loginPattern,
	namePattern,
	emailPattern,
	phonePattern,
} from '../../utils/patterns';
import './edit.scss';

export default class PageEdit extends Block<Record<string, unknown>> {
	constructor(props: Record<string, unknown>) {
		super({
			...props,
			baseTitle: new BaseTitle({
				title: 'Изменить данные',
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
				pattern,
				type,
			});
		const inputFields = {
			inputFieldEmail: createInputField('Почта', 'email', emailPattern),
			inputFieldLogin: createInputField('Логин', 'login', loginPattern),
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
			inputFieldPhone: createInputField(
				'Номер телефона',
				'phone',
				phonePattern,
			),
			inputFieldNickName: createInputField(
				'Имя в чате',
				'display_name',
				namePattern,
			),
		};
		const button = new Button({
			text: 'Сохранить',
			onClick: (e: MouseEvent) => {
				e.preventDefault();
				const elements = Object.values(inputFields).map((field) => ({
					element: field
						.getContent()
						.querySelector('input') as HTMLInputElement,
					field,
				}));

				let isFormValid = true;

				elements.forEach(({ element, field }) => {
					const isValid = element.checkValidity();
					field.setProps({
						isValid,
						errorMessage: isValid ? '' : `Invalid ${element.name}`,
					});
					if (!isValid) {
						isFormValid = false;
					}
				});

				if (isFormValid) {
					console.log(elements.map(({ element }) => element.value));
				}
			},
		});
		const sidebar = new Sidebar({});

		this.children = {
			...this.children,
			...inputFields,
			button,
			sidebar,
		};
	}

	protected render() {
		return `
        <section class="edit">
            {{{ sidebar }}}
            <form class="edit__form">
                {{{ baseTitle }}}
                {{{ inputFieldEmail }}}
                {{{ inputFieldLogin }}}
                {{{ inputFieldFirstName }}}
                {{{ inputFieldSecondName }}}
                {{{ inputFieldPhone }}}
                {{{ inputFieldNickName }}}
                {{{ button }}}
            </form>
        </section>
        `;
	}
}
