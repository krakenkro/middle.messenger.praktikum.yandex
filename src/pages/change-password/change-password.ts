import { BaseTitle, Button, InputField, Sidebar } from "../../components";
import Block from "../../core/Block";
import './change-password.scss';
export class ChangePassword extends Block<Record<string, unknown>> {
    constructor(props: Record<string, unknown>) {
        super({
            ...props,
            baseTitle: new BaseTitle({
                title: 'Изменить пароль'
            })
        });
    }


    protected init(): void {
        const createInputField = (title: string, name: string, type: string = 'text'): InputField => {
            return new InputField({
                className: 'auth-form__input',
                title,
                name,
                type,
            });
        };
        const inputFields = {
            inputFieldPassword: createInputField('Старый пароль', 'old_password', 'password'),
            inputFieldNewPassword: createInputField('Новый пароль', 'new_password', 'password'),
            inputFieldPasswordRepeat: createInputField('Повторите новый пароль', 'repeat_new_password', 'password'),
        };
        const button = new Button({
            text: 'Сохранить',
            page: 'profile',
        });
        const sidebar = new Sidebar({})

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