import Block from "../../core/Block";
import { Error } from "../../components";

interface ErrorType {
  error: Error
}

export class Page404 extends Block<ErrorType> {
  constructor(props: ErrorType) {
    super({
      ...props,
      error: new Error({
        status: '404',
        message: 'Страница не найдена',
        href: 'chat'
      })
    });
  }

  protected render() {
    return `
      <div class="error-404 container">
        {{{ error }}}
      </div>
    `;
  }
}
