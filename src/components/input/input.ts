import Block from "../../core/Block";

export class Input extends Block {
    constructor(props: Record<string, unknown>) {
        super({
            ...props,
        });
    }

    protected render() {
        return `
        <div class="input{{#if className}} {{className}}{{/if}}">
            <input
                class="input__element{{#if className}} {{className}}{{/if}}"
                type="{{type}}" title="{{ title}}" name="{{name}}" value="{{value}}" placeholder="{{placeholder}}">
        </div>
        `;
    }
}
