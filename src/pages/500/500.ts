import Block from "../../core/Block";
import { Error } from "../../components";

interface ErrorType {
  error: Error
}

export class Page500 extends Block<ErrorType> {
  constructor(props: ErrorType) {
    super({
      ...props,
      error: new Error({
        status: '500',
        message: 'Упс, у нас что то сломалось',
        href: 'chat'
      })
    });
  }

  protected render() {
    return `
      <div class="error-500 container">
        {{{ error }}}
      </div>
    `;
  }
}
