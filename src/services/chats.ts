import { chatApi } from '../api/chatApi';
import store from '../core/Store';
import Router from '../core/Router'; 
class Chats {
    public async getChats() {
        const chats = await chatApi.getChats();
        store.set('chats', chats);
    }
}

export const chats = new Chats();
