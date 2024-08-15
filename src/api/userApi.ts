import HttpClient from '../core/HttpClient';
import { User, Password } from '../utils/types';

class UserApi {
    private httpClient: HttpClient;

    constructor() {
        this.httpClient = new HttpClient();
    }

    public async changeUser(data: User) {
        return this.httpClient.put('/user/profile', data);
    }

    public async changePassword(data: Password) {
        return this.httpClient.put('/user/password', data);
    }

    public async changeAvatar(data: { avatar: File }) {
        const formData = new FormData();
        formData.append('avatar', data.avatar);

        return this.httpClient.put('/user/profile/avatar', formData, { 'Content-Type': 'multipart/form-data'});
    }
}

export const userApi = new UserApi();
