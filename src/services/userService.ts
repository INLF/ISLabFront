import axios from "../axios/axiosInstance";
import { User } from '../types/userTypes';

const API_URL_FILTERED = '/api/user/filtered';
const API_URL_UPDATE = '/api/user/update';
const API_URL_CREATE = '/api/user/create';
const API_URL_DELETE = 'api/user';
const API_URL_LOGOUT = 'api/logout';
const API_URL_LOGIN = 'api/login';

const API_URL_ME = '/api/me';

export interface LoginCreds {
    login: string;
    password: string;
}

export const getMe = async (): Promise<User> => {
    const response = await axios.get<User>(API_URL_ME);
    return response.data;
};

export const logout = async (): Promise<string> => {
    const response = await axios.post<string>(API_URL_LOGOUT);
    return response.data;
};

export const login = async (creds: LoginCreds): Promise<User> => {
    const response = await axios.post<User>(API_URL_LOGIN, creds);
    return response.data;
};


