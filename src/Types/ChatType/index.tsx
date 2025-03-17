import {UserType} from "@/Types/Users/UsersType";


export interface AllMemberType {
    id: number;
    name: string;
    image: string;
    status: string;
    online: string;
    lastSeenDate: string;
    time: string;
    reply: string;
    badge?: boolean;
}


export interface  MessageType {
    id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    message: string;
    attachment: string;
    sender : UserType;
}

export interface MessageTypes {
    name?: string;
    sender: number;
    class?: string;
    time: string;
    text: string;
    status?:boolean;
}

export interface ChatsTypes {
    id?: number;
    users: number[];
    lastMessageTime: string;
    messages: MessageType[];
    time?: string;
}

export interface ChatSliceType {
    // allMembers: AllMemberType[] | [];
    // chats: ChatsTypes[] | [];
    // members: AllMemberType[]|[];
    // currentUser:null|AllMemberType,
    // selectedUser?: null|AllMemberType
    usersJoined : UserType [];
    messages: MessageType[];
}

export interface DropClassTypes {
    dropClass ?: string
}

export interface data{
    users:{}
}

export interface SearchNotFoundClassType {
    word: string;
}

