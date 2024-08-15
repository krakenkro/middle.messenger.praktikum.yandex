import { authApi } from '../api/authApi';
import { Signup, Login } from '../utils/types';
import store from '../core/Store';
import Router from '../core/Router'; 
class Auth {
    public async getUser() {
        const user = await authApi.getUser();
        store.set('loggedIn', true);
        store.set('user', user);
    }

    public async signup(data: Signup) {
        try {
            const res = await authApi.signup(data);
            await this.getUser();
            Router.go('/chat');
        } catch (error) {
            console.error('Error signing up:', error);
        }
    }

    public async signin(data: Login) {
        try {
            await authApi.signin(data);
            await this.getUser();
            Router.go('/chat');
        } catch (error) {
            console.error('Error signing in:', error);
        }
    }

    public async logout() {
        try {
            await authApi.logout();
            store.set('loggedIn', false );
            console.log('User logged out');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }
}

export const auth = new Auth();
