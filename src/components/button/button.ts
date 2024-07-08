import Block from '../../core/Block';

export class Button extends Block {
	constructor(props: Record<string, unknown>) {
		super({
			...props,
			events: {
				click: props.onClick,
			}
		});
	}

	protected render() {
		return `
        <button class="base-button{{#if className}} {{className}}{{/if}}" page="{{ page }}">
            {{ text }}
        </button>
        `;
	}
}
