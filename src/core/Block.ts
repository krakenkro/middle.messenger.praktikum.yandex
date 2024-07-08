import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';
import EventBus from './EventBus';

type BlockProps = Record<string, any>;

// eslint-disable-next-line no-use-before-define
type BlockChildren = Record<string, Block>;

type BlockLists = Record<string, any[]>;

export default class Block<P extends BlockProps = {}> {
	static EVENTS = {
		INIT: 'init',
		FLOW_CDM: 'flow:component-did-mount',
		FLOW_CDU: 'flow:component-did-update',
		FLOW_RENDER: 'flow:render',
	} as const;

	private _element: HTMLElement | null = null;

	public eventBus: () => EventBus;

	_id: string = nanoid(6);

	protected props: P;

	public children: BlockChildren;

	public lists: BlockLists;

	constructor(propsWithChildren: P) {
		const eventBus = new EventBus();
		const { props, children, lists } = this._getChildrenAndProps(propsWithChildren);

		this.props = this._makePropsProxy({ ...props });
		this.children = children;
		this.lists = lists;
		this.eventBus = () => eventBus;

		this._registerEvents(eventBus);
		eventBus.emit(Block.EVENTS.INIT);
	}

	private _addEvents() {
		const { events = {} } = this.props;
		Object.keys(events).forEach((eventName) => {
			this._element?.addEventListener(eventName, events[eventName], true);
		});
	}

	private _removeEvents(): void {
		const { events = {} } = this.props;
		Object.keys(events).forEach((eventName) => {
			// eslint-disable-next-line no-undef
			if (Array.isArray(events[eventName])) {
				events[eventName].forEach(
					(event: EventListenerOrEventListenerObject) =>
						this._element?.removeEventListener(eventName, event),
				);
			}
		});
	}

	private _registerEvents(eventBus: EventBus): void {
		eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	private _init(): void {
		this.init();

		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	// eslint-disable-next-line class-methods-use-this
	protected init(): void {}

	private _componentDidMount(): void {
		this.componentDidMount();

		Object.values(this.children).forEach((child) => {
			if (Array.isArray(child)) {
				child.forEach((ch) => {
					ch.dispatchComponentDidMount();
				});
			} else {
				child.dispatchComponentDidMount();
			}
		});
	}

	protected componentDidMount(): void {}

	public dispatchComponentDidMount(): void {
		this.eventBus().emit(Block.EVENTS.FLOW_CDM);
	}

	private _componentDidUpdate(oldProps: P, newProps: P): void {
		this._removeEvents();
		const response = this.componentDidUpdate(oldProps, newProps);
		if (!response) {
			return;
		}
		this._render();
	}

	protected componentDidUpdate(oldProps: P, newProps: P): boolean {
		return oldProps !== newProps;
	}

	// eslint-disable-next-line class-methods-use-this
	private _getChildrenAndProps(propsAndChildren: P): {
		children: BlockChildren;
		props: P;
		lists: BlockLists;
	} {
		const children: BlockChildren = {};
		const props: BlockProps = {};
		const lists: BlockLists = {};

		Object.entries(propsAndChildren).forEach(([key, value]) => {
			if (value instanceof Block) {
				children[key] = value;
			} else if (Array.isArray(value)) {
				lists[key] = value;
			} else {
				props[key] = value;
			}
		});

		return { children, props: props as P, lists };
	}

	// addAttributes() {
	//     const {attr = {}} = this.props;

	//     Object.entries(attr).forEach(([key, value: unknown]) => {
	//       this._element?.setAttribute(key, value);
	//     });
	//   }

	public setProps(nextProps: Partial<P>): void {
		if (!nextProps) {
			return;
		}

		Object.assign(this.props, nextProps);
	}

	public get element(): HTMLElement | null {
		return this._element;
	}

	private _render(): void {
		const propsAndStubs: Record<string, any> = { ...this.props };
		// eslint-disable-next-line no-underscore-dangle
		const _tmpId = nanoid(6);

		Object.entries(this.children).forEach(([key, child]) => {
			// eslint-disable-next-line no-underscore-dangle
			propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
		});

		Object.entries(this.lists).forEach(([key]) => {
			propsAndStubs[key] = `<div data-id="__l_${_tmpId}"></div>`;
		});

		const fragment = this._createDocumentElement('template');
		fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

		Object.values(this.children).forEach((child) => {
			// eslint-disable-next-line no-underscore-dangle
			const stub = fragment.content.querySelector(
				`[data-id="${child._id}"]`,
			);
			stub?.replaceWith(child.getContent());
		});
		const newElement = fragment.content.firstElementChild as HTMLElement;

		Object.entries(this.lists).forEach(([, child]) => {
			const listCont = this._createDocumentElement('template');
			child.forEach((item) => {
				if (item instanceof Block) {
					listCont.content.append(item.getContent());
				} else {
					listCont.content.append(`${item}`);
				}
			});
			const stub = fragment.content.querySelector(
				`[data-id="__l_${_tmpId}"]`,
			);
			stub?.replaceWith(listCont.content);
		});

		if (this._element) {
			this._element.replaceWith(newElement);
		}

		this._element = newElement;

		this._addEvents();
	}

	protected render(): string {
		return '';
	}

	public getContent(): HTMLElement {
		return this.element as HTMLElement;
	}

	private _makePropsProxy(props: P): P {
		const self = this;

		return new Proxy(props, {
			get(target, prop) {
				const value = target[prop as keyof P];
				return typeof value === 'function' ? value.bind(target) : value;
			},
			set(target, prop, value) {
				const oldTarget = { ...target };
				// eslint-disable-next-line no-param-reassign
				target[prop as keyof P] = value;

				self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
				return true;
			},
			deleteProperty() {
				throw new Error('Нет доступа');
			},
		});
	}

	// eslint-disable-next-line class-methods-use-this
	private _createDocumentElement(tagName: string): HTMLTemplateElement {
		return document.createElement(tagName) as HTMLTemplateElement;
	}

	public show(): void {
		const content = this.getContent();
		if (content) {
			content.style.display = 'block';
		}
	}

	public hide(): void {
		const content = this.getContent();
		if (content) {
			content.style.display = 'none';
		}
	}
}
