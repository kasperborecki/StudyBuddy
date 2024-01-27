export interface Profile {
  user_id: string;
  name?: string;
  avatar_url?: string;
}

export interface LastMessage {
    user_id?: string;
    context?: string;
    delivered_date?: string;
}
  
export interface MessageCount {
    user_id?: string;
    is_read?: boolean;
    context?: string;
}

export interface Chats {
    id?: string;
    first_participant: string;
    second_participant: string;
    profile?: Profile | undefined;
    un_read_messages?: MessageCount[] | undefined;
    last_message?: LastMessage | undefined;
}