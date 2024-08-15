import HttpClient from '../core/HttpClient';
import { Signup, Login, User } from '../utils/types';

class AuthApi {
    private httpClient: HttpClient;

    constructor() {
        this.httpClient = new HttpClient();
    }

    public async signup(data: Signup): Promise<{ id: number }> {
        return this.httpClient.post('/auth/signup', data) as Promise<{ id: number }>;
    }

    public async signin(data: Login) {
        return await this.httpClient.post('/auth/signin', data);
    }

    public async getUser(): Promise<User> {
        return this.httpClient.get('/auth/user') as Promise<User>;
    }

    public async logout(): Promise<{ status: string }> {
        return this.httpClient.post('/auth/logout', {}) as Promise<{ status: string }>;
    }
}

export const authApi = new AuthApi();
