export interface CreateRegister {
    user_name: string,
    email: string;
    roll: string;
    school_name: string;
    class_name: string;
}
export interface CreateRegistration {
    password: string;
    email: string;
    name: string;
    role: string;
    status: boolean;
}
export interface Login{
    email: string;
    password: string;
}
export interface LoginResponse {
    status: number;
    message: string;
    data: UserInfo[]
}

export interface UserInfo {
    _id: string;
    user_name: string;
    email: string;
    school_name: string;
    role: string;
    class_name: string;
    status: boolean;
    roll?: string;
}
export interface UserResponse{
    data: UserList[];
    status: boolean;
}

export interface UserList{
    _id: string;
    name: string;
    email: string
    password: string;
    role: string;
    status: boolean,
    updatedAt: string;
}
export interface Status{
    status: boolean;
}