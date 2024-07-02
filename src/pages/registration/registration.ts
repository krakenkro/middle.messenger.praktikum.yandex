import { BaseTitle, Button, InputField, Link } from "../../components";
import Block from "../../core/Block";

export class PageRegistration extends Block<Record<string, unknown>> {
    constructor(props: Record<string, unknown>) {
        super({
            ...props,
            baseTitle: new BaseTitle({
                title: 'Регистрация'
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
            inputFieldEmail: createInputField('Email', 'email'),
            inputFieldFirstName: createInputField('Имя', 'first_name'),
            inputFieldSecondName: createInputField('Фамилия', 'second_name'),
            inputFieldLogin: createInputField('Логин', 'login'),
            inputFieldPhone: createInputField('Номер телефона', 'phone'),
            inputFieldPassword: createInputField('Пароль', 'password', 'password'),
            inputFieldPasswordRepeat: createInputField('Повторите пароль', 'password_repeat', 'password'),
        };
        const button = new Button({
            text: 'Войти',
            page: 'chat',
        });
        const link = new Link({
            text: 'Авторизоваться',
            page: 'login'
        })

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
                {{{ inputFieldEmail }}}
                {{{ inputFieldFirstName }}}
                {{{ inputFieldSecondName }}}
                {{{ inputFieldLogin }}}
                {{{ inputFieldPhone }}}
                {{{ inputFieldPassword }}}
                {{{ inputFieldPasswordRepeat }}}
                {{{ button }}}
                {{{ link }}}
            </form> 
        </section>
        `;
    }
}