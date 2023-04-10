import axios, { AxiosResponse } from 'axios';

type LoginData = {
  email: string;
  password: string;
};

type RegisterData = {
  email: string;
  password: string;
  name: string;
};

export type UserData = {
  type: 'user' | 'agent' | null;
  id: number | null;
  name: string | null;
  token: string | null;
  email: string | null;
};

export const loginAPI = async ({
  email,
  password,
}: LoginData): Promise<UserData> => {
  try {
    const response: AxiosResponse<UserData> = await axios.post('/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerAPI = async ({
  email,
  password,
  name,
}: RegisterData): Promise<UserData> => {
  try {
    const response: AxiosResponse<UserData> = await axios.post('/register', {
      email,
      password,
      name,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logoutAPI = async (token: string): Promise<void> => {
  try {
    await axios.post('/logout', null, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    throw error;
  }
};
