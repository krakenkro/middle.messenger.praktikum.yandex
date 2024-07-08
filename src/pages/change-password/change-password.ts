import { BaseTitle, Button, InputField, Sidebar } from '../../components';
import Block from '../../core/Block';
import { passwordPattern } from '../../utils/patterns';
import './change-password.scss';

export default class ChangePassword extends Block<Record<string, unknown>> {
	constructor(props: Record<string, unknown>) {
		super({
			...props,
			baseTitle: new BaseTitle({ title: 'Изменить пароль' }),
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
			inputFieldPassword: createInputField(
				'Старый пароль',
				'old_password',
				passwordPattern,
				'password',
			),
			inputFieldNewPassword: createInputField(
				'Новый пароль',
				'new_password',
				passwordPattern,
				'password',
			),
			inputFieldPasswordRepeat: createInputField(
				'Повторите новый пароль',
				'repeat_new_password',
				passwordPattern,
				'password',
			),
		};
		const button = new Button({
			text: 'Сохранить',
			onClick: (e: MouseEvent) => {
				e.preventDefault();
				const oldPasswordElement = inputFields.inputFieldPassword
					.getContent()
					.querySelector('input') as HTMLInputElement;
				const newPasswordElement = inputFields.inputFieldNewPassword
					.getContent()
					.querySelector('input') as HTMLInputElement;
				const repeatPasswordElement =
					inputFields.inputFieldPasswordRepeat
						.getContent()
						.querySelector('input') as HTMLInputElement;

				const isOldPasswordValid = oldPasswordElement.checkValidity();
				const isNewPasswordValid = newPasswordElement.checkValidity();
				const isRepeatPasswordValid =
					repeatPasswordElement.checkValidity();

				inputFields.inputFieldPassword.setProps({
					isValid: isOldPasswordValid,
					errorMessage: isOldPasswordValid
						? ''
						: 'Invalid old password',
				});

				inputFields.inputFieldNewPassword.setProps({
					isValid: isNewPasswordValid,
					errorMessage: isNewPasswordValid
						? ''
						: 'Invalid new password',
				});

				inputFields.inputFieldPasswordRepeat.setProps({
					isValid: isRepeatPasswordValid,
					errorMessage: isRepeatPasswordValid
						? ''
						: 'Passwords do not match',
				});

				if (
					isOldPasswordValid &&
					isNewPasswordValid &&
					isRepeatPasswordValid
				) {
					console.log({
						oldPassword: oldPasswordElement.value,
						newPassword: newPasswordElement.value,
						repeatPassword: repeatPasswordElement.value,
					});
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
        <section class="change-password">
            {{{ sidebar }}}
            <form class="change-password__form">
                {{{ baseTitle }}}
                {{{ inputFieldPassword }}}
                {{{ inputFieldNewPassword }}}
                {{{ inputFieldPasswordRepeat }}}
                {{{ button }}}
            </form>
        </section>
        `;
	}
}
