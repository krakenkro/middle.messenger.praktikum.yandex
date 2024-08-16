import { BaseTitle, Button, InputField, Sidebar } from '../../components';
import Block from '../../core/Block';
import { connect } from '../../core/HOC';
import { State } from '../../core/Store';
import { loginPattern, namePattern, emailPattern, phonePattern } from '../../utils/patterns';
import { userService } from '../../services/user';
import { User } from '../../utils/types';
import './edit.scss';

const mapStateToProps = (state: State) => ({
    user: {
        login: state.user?.login ?? '',
        first_name: state.user?.first_name ?? '',
        second_name: state.user?.second_name ?? '',
        phone: state.user?.phone ?? '',
        email: state.user?.email ?? '',
        display_name: state.user?.display_name ?? '',
    },
});

interface PageEditProps {
    user: User;
	baseTitle: BaseTitle;
}

class PageEdit extends Block<PageEditProps> {
	constructor(props: PageEditProps) {
		super({
			...props,
			baseTitle: new BaseTitle({ title: 'Изменить данные' }),
		});
		this.initInputs(this.props.user);
	}

	protected init(): void {
		this.initInputs(this.props.user);
	}

	private initInputs(user: User): void {
		const createInputField = (
            title: string,
            name: string,
            pattern: string,
            value: string,
            type: string = 'text',
        ): InputField => new InputField({ className: 'auth-form__input', title, name, pattern, value, type });

        const inputFields = {
            inputFieldEmail: createInputField('Почта', 'email', emailPattern, user.email),
            inputFieldLogin: createInputField('Логин', 'login', loginPattern, user.login),
            inputFieldFirstName: createInputField('Имя', 'first_name', namePattern, user.first_name),
            inputFieldSecondName: createInputField('Фамилия', 'second_name', namePattern, user.second_name),
            inputFieldPhone: createInputField('Номер телефона', 'phone', phonePattern, user.phone),
            inputFieldNickName: createInputField('Имя в чате', 'display_name', namePattern, user.display_name),
        };

		const button = new Button({
			text: 'Сохранить',
			onClick: async (e: MouseEvent) => {
				e.preventDefault();
				const elements = Object.values(inputFields).map((field) => ({
					element: field.getContent().querySelector('input') as HTMLInputElement,
					field,
				}));

				let isFormValid = true;

				elements.forEach(({ element, field }) => {
					const isValid = element.checkValidity();
					field.setProps({ isValid, errorMessage: isValid ? '' : `Invalid ${element.name}` });
					if (!isValid) {
						isFormValid = false;
					}
				});

				if (isFormValid) {
					const userData: User = {
						login: inputFields.inputFieldLogin.getValue() || '',
                        first_name: inputFields.inputFieldFirstName.getValue() || '',
                        second_name: inputFields.inputFieldSecondName.getValue() || '',
                        phone: inputFields.inputFieldPhone.getValue() || '',
                        email: inputFields.inputFieldEmail.getValue() || '',
                        display_name: inputFields.inputFieldNickName.getValue() || '',
						id: user.id,
						avatar: user.avatar,
					};
					
					try {
						await userService.changeUser(userData);
					} catch (error) {
						console.error('Error updating user:', error);
					}
				}
			},
		});

		const sidebar = new Sidebar({});

		this.children = { ...this.children, ...inputFields, button, sidebar };
	}

	componentDidUpdate(oldProps: PageEditProps, newProps: PageEditProps): boolean {
		if (oldProps.user !== newProps.user) {
			this.initInputs(newProps.user);
			return true;
		}
		return false;
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

export default connect(mapStateToProps)(PageEdit);
