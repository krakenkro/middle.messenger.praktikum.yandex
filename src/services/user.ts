import { userApi } from '../api/userApi';
import { User, Password } from '../utils/types';
import store from '../core/Store';
import Router from '../core/Router'; 
class UserService {
    public async changeUser(data: User) {
        try {
            const user = await userApi.changeUser(data);
            store.set('user', user);
            Router.go('/profile');
        } catch (error) {
            console.error('Error signing up:', error);
        }
    }

    public async changePassword(data: Password) {
        try {
            await userApi.changePassword(data);
            Router.go('/profile');
        } catch (error) {
            console.error('Error signing up:', error);
        }
    }

    public async changeAvatar(data: { avatar: File }) {
        try {
            await userApi.changeAvatar(data);
            Router.go('/profile');
        } catch (error) {
            console.error('Error signing in:', error);
        }
    }
}

export const userService = new UserService();
