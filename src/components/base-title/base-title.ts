import Block from "../../core/Block";

export class BaseTitle extends Block {
	constructor(props: Record<string, unknown>) {
		super({
			...props,
		});
	}

	protected render() {
		return `
        <h1 class="base-title">
            {{ title }}
        </h1>

    `;
	}
}
