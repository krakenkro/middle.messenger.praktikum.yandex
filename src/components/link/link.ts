import Block from '../../core/Block';

export class Link extends Block {
	protected render() {
		return `
      <a href="{{{url}}}" class="link{{#if className}} {{{className}}}{{/if}}" page="{{{page}}}">{{{text}}}</a>
    `;
	}
}
