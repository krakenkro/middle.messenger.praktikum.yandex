import Block from '../../core/Block';
import { Input, InputProps } from '../input/input';

interface InputFieldProps extends InputProps {
	title?: string;
	pattern?: string;
	errorMessage?: string;
	isValid?: boolean;
}

export class InputField extends Block<InputFieldProps> {
	constructor(props: InputFieldProps) {
		super({
			...props,
			events: {
				blur: (event: Event) => this.handleEvent(event),
				input: (event: Event) => this.handleEvent(event),
			},
		});
	}

	private handleEvent(event: Event) {
		if (event instanceof FocusEvent && event.type === 'blur') {
			this.validate(event.target as HTMLInputElement);
		}
	}

	getValue() {
        return this.props.value;
    }

	public validate(inputElement: HTMLInputElement) {
		const { pattern } = this.props;
		if (pattern) {
			try {
				const regex = new RegExp(pattern);
				const isValid = regex.test(inputElement.value);
				this.setProps({
					isValid,
					errorMessage: isValid ? '' : 'Invalid input',
					value: inputElement.value,
				});
				return isValid;
			} catch (error) {
				console.error('Invalid pattern', error);
				this.setProps({
					isValid: false,
					errorMessage: 'Invalid pattern',
					value: inputElement.value,
				});
				return false;
			}
		}
		return true;
	}

	protected init(): void {
		const inputElement = new Input({
			type: this.props.type,
			title: this.props.title,
			className: 'input-field__element',
			name: this.props.name,
			value: this.props.value,
			placeholder: this.props.placeholder,
			pattern: this.props.pattern,
			required: this.props.required,
			isValid: this.props.isValid,
			errorMessage: this.props.errorMessage,
			events: {
				blur: (event: Event) => this.handleEvent(event),
				input: (event: Event) => this.handleEvent(event),
			},
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
            {{#if errorMessage}}
                <div class="input-field__error">{{errorMessage}}</div>
            {{/if}}
        </div>
        `;
	}
}
