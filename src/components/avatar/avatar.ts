import Block from "../../core/Block";
import './avatar.scss';

export class Avatar extends Block {
  constructor(props: Record<string, any>) {
    super({
      ...props,
    });
  }

  protected render() {
    return `
        {{#if imageUrl}}
            <div class="avatar {{className}} {{size}}">
                <img src="{{imageUrl}}" alt="Avatar" class="avatar__img">
                {{#if isEdit}} {{> Input type="file" name="avatar"}} {{/if}}
            </div>
        {{/if}}
    `;
  }
}
