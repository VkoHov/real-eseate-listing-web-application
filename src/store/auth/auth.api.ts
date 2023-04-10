import axios, { AxiosResponse } from 'config/axios';

type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  email: string;
  password: string;
  role: 'user' | 'agent';
  name: string;
};

export type UserData = {
  role: 'user' | 'agent' | null;
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
    localStorage.setItem('auth', JSON.stringify(response.data.user));
    return response;
  },

  register: async ({
    email,
    password,
    role,
    name,
  }: RegisterData): Promise<
    AxiosResponse<{ user: UserData; accessToke: string }>
  > => {
    const response = await axios.post('/register', {
      email,
      password,
      role,
      name,
    });
    localStorage.setItem('auth', JSON.stringify(response.data.user));
    return response;
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem('auth');
  },
};
