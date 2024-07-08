import Block from '../../core/Block';
import { Link } from '../link';

export class Error extends Block {
	constructor(props: Record<string, any>) {
		super({
			...props,
			link: new Link({
				text: 'Назад к чатам',
				page: props.href,
			}),
		});
	}

	protected render() {
		return `
      <div class="error">
        <h1 class="error__status">{{status}}</h1>
        <span class="error__message">{{message}}</span>
        {{{link}}}
      </div>
    `;
	}
}
