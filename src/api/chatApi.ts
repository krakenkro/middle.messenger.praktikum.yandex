import HttpClient from '../core/HttpClient';
import { Chat, ChatInteractionData } from '../utils/types';
interface UserTokenResponse {
    token: string;
}
class ChatApi {
    private httpClient: HttpClient;

    constructor() {
        this.httpClient = new HttpClient();
    }

    public async getChats(): Promise<Chat> {
        return this.httpClient.get('/chats') as Promise<Chat>;
    }

    public async createChat(data: { title: string}) {
        return this.httpClient.post('/chats', data);
    }

    public async deleteChatById(data: { chatId: number }) {
        return this.httpClient.delete('/chats', data);
    }
    
    public async addUserToChat(data: ChatInteractionData) {
        return this.httpClient.put('/chats', data);
    }
    
    public async deleteUserFromChat(data: ChatInteractionData) {
        return this.httpClient.delete('/chats', data);
    }

    public async getUserToken(chatId: number): Promise<UserTokenResponse> {
        return this.httpClient.post(`/chats/token/${chatId}`, {});
    }
}

export const chatApi = new ChatApi();
