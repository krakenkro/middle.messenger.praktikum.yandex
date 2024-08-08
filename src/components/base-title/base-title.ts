import Block from '../../core/Block';

export class BaseTitle extends Block {
	protected render() {
		return `
			<h1 class="base-title">
				{{ title }}
			</h1>
		`;
	}
}
