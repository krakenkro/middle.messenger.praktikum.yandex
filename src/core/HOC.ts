import Block from './Block';
import store, { State, StoreEvents } from './Store';

export const connect = <T extends Record<string, any>>(mapStateToProps:
	(data: State) => any) => {
	return (Component: typeof Block<T>) => {
		return class extends Component {
			constructor(props: any) {
				super({ ...props, ...mapStateToProps(store.getState()) });
				store.on(StoreEvents.Updated, () => {
					const newProps = mapStateToProps(store.getState());
					this.setProps(newProps);
				});
			}
		};
	};
};
