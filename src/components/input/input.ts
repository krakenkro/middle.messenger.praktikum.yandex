import Block from '../../core/Block';

export interface InputProps {
	id?: string;
	type?: string;
	title?: string;
	className?: string;
	name?: string;
	value?: string;
	placeholder?: string;
	pattern?: string;
	required?: boolean;
	isValid?: boolean;
	errorMessage?: string;
	events?: Record<string, (event: Event) => void>;
}

export class Input extends Block<InputProps> {
	protected addEvents() {
		const { events = {} } = this.props;

		Object.keys(events).forEach((eventName) => {
			this.getContent()
				.querySelector('input')
				?.addEventListener(
					eventName,
					events[eventName] as EventListenerOrEventListenerObject,
				);
		});
	}

	protected removeEvents() {
		const { events = {} } = this.props;

		Object.keys(events).forEach((eventName) => {
			this.getContent()
				.querySelector('input')
				?.removeEventListener(
					eventName,
					events[eventName] as EventListenerOrEventListenerObject,
				);
		});
	}

	protected render() {
		return `
        <div class="input{{#if className}} {{className}}{{/if}}">
            <input
                id="{{id}}"
                class="input__element{{#if className}} {{className}}{{/if}}"
                type="{{type}}" 
                title="{{title}}" 
                name="{{name}}" 
                value="{{value}}" 
                placeholder="{{placeholder}}"
                pattern="{{pattern}}"
                required="{{required}}"
            >
            {{#if errorMessage}}
                <div class="input__error">{{errorMessage}}</div>
            {{/if}}
        </div>
        `;
	}
}
