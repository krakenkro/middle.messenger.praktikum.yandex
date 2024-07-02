import { BaseTitle, Button, InputField, Link } from "../../components";
import Block from "../../core/Block";

export class PageLogin extends Block<Record<string, unknown>> {
    constructor(props: Record<string, unknown>) {
        super({
            ...props,
            baseTitle: new BaseTitle({
                title: 'Авторизация'
            })
        });
    }

    protected init(): void {
        const inputFieldLogin = new InputField({
            className: 'auth-form__input',
            title: 'Логин', 
            name: 'login',
        });

        const inputFieldPassword = new InputField({
            className: 'auth-form__input',
            title: 'Пароль', 
            name: 'password',
            type: 'password',
        });

        const button = new Button({
            text: 'Войти',
            // page: 'chat',
            onClick: (e: MouseEvent) => {
                e.preventDefault();
            }
        });

        const link = new Link({
            text: 'Зарегистрироваться',
            page: 'registration'
        })

        this.children = {
            ...this.children,
            inputFieldLogin,
            inputFieldPassword,
            button,
            link,
        };
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
