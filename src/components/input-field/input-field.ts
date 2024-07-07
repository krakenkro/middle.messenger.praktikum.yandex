import Block from '../../core/Block';
import { Input } from '../input/input';

export class InputField extends Block<Record<string, unknown>> {
	constructor(props: Record<string, unknown>) {
		super({
			...props,
		});
	}

	protected init(): void {
		const inputElement = new Input({
			type: this.props.type,
			title: this.props.title,
			className: 'input-field__element',
			name: this.props.name,
		});

		this.children = {
			...this.children,
			inputElement,
		};
	}

	protected render() {
		return `
        <div class="input-field{{#if className}} {{ className }}{{/if}}">
            <div class="input-field__title">{{ title }}</div>
            {{{inputElement}}}
        </div>
        `;
	}
}
