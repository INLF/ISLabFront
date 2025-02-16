

export enum UserRole{
    ADMIN="ADMIN",
    USER="USER",
    UNAUTHORIZED="UNAUTHORIZED"
}

export interface User{
    id: number;
    name: string;
    login: string;
    role: UserRole;
    createdAt: string;
}