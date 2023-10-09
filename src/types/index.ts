export interface RoomInfo {
  title: string;
  subtitle?: string;
  avatar?: string;
}

export interface CreateUserInfo {
  name: string;
  email: string;
  password: string;
}

export interface UserInfo {
  id: number;
  name: string;
}

export interface CreateChatInfo {
  name: string;
}

export interface ChatInfo {
  id: number;
  name: string;
}
