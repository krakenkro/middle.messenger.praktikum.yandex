import { auth } from '../services/auth.ts';
import router from '../core/Router.ts';
import store from '../core/Store.ts';
import { chats } from '../services/chats.ts';

const renderApp = async () => {
    try {
        await auth.getUser();
        if (store.getState().user !== null) {
            store.set('loggedIn', true);
        }
    } catch (error) {
        router.go('/');
        return;
    }

    router.start();
};

export { renderApp };
