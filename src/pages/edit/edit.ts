import {
	BaseTitle, Button, InputField, Sidebar,
} from '../../components';
import Block from '../../core/Block';
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
		const createInputField = (title: string, name: string, type: string = 'text'): InputField => new InputField({
			className: 'auth-form__input',
			title,
			name,
			type,
		});
		const inputFields = {
			inputFieldEmail: createInputField('Почта', 'email'),
			inputFieldLogin: createInputField('Логин', 'login'),
			inputFieldFirstName: createInputField('Имя', 'first_name'),
			inputFieldSecondName: createInputField('Фамилия', 'second_name'),
			inputFieldPhone: createInputField('Номер телефона', 'phone'),
			inputFieldNickName: createInputField('Имя в чате', 'display_name'),
		};
		const button = new Button({
			text: 'Сохранить',
			page: 'profile',
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
