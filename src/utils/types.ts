export interface User {
    id: number,
    first_name: string,
    second_name: string,
    display_name: string,
    phone: string,
    login: string,
    avatar: string,
    email: string
}

export interface Signup {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string
}

export interface Login {
    login: string,
    password: string
}

export interface Resources {
    id: number,
    user_id: number,
    path: string,
    filename: string,
    content_type: string,
    content_size: string,
    upload_date: string
}

export interface Chat {
    id: number,
    title: string,
    avatar: string,
    unread_count: number,
    created_by: number,
    time: Date,
    content: string,
    last_message:{
        user: User
    }
}

export interface Password {
    oldPassword: string,
    newPassword: string
}

export interface ChatInteractionData {
    users: number[];
    chatId: number;
};

export interface MessageData {
    content: string;
    time: string;
    user_id: number;
    type: string;
};
