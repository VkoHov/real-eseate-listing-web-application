import axios, { AxiosResponse } from 'config/axios';

type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  email: string;
  password: string;
  type: 'user' | 'agent';
  name: string;
};

export type UserData = {
  type: 'user' | 'agent' | null;
  id: number | null;
  name: string | null;
  email: string | null;
};

// Define the API methods
export const api = {
  login: async ({
    email,
    password,
  }: LoginData): Promise<
    AxiosResponse<{ user: UserData; accessToke: string }>
  > => {
    const response = await axios.post(
      '/login',
      {
        email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    localStorage.setItem('auth', response.data);
    return response;
  },

  register: async ({
    email,
    password,
    type,
    name,
  }: RegisterData): Promise<AxiosResponse<UserData>> => {
    const response = await axios.post('/auth/register', {
      email,
      password,
      type,
      name,
    });
    localStorage.setItem('token', response.data.accessToken);
    return response;
  },

  logout: async (): Promise<void> => {
    const token = localStorage.getItem('token');
    if (token) {
      localStorage.removeItem('token');
      await axios.post('/auth/logout', null, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  },
};
