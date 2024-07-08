import Block from "../../core/Block";

export class Link extends Block {
	constructor(props: Record<string, any>) {
		super({
			...props,
		});
	}

	protected render() {
		return `
      <a href="{{{url}}}" class="link{{#if className}} {{{className}}}{{/if}}" page="{{{page}}}">{{{text}}}</a>
    `;
	}
}
