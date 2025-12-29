// src/lib/api/client.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // Adjust based on your backend port

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface EmailData {
  recipients: string[];
  subject: string;
  body: string;
}

export interface User {
  email: string;
  id: string;
}

export interface LoginResponse {
  success: any;
  token: string;
  user: User;
}

class ApiClient {
  private axiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add token to requests if available
    this.axiosInstance.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await this.axiosInstance.post('/api/auth/login', credentials);
    return response.data;
  }

  async register(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await this.axiosInstance.post('/api/auth/register', credentials);
    return response.data;
  }

  async sendBulkEmail(emailData: EmailData): Promise<any> {
    const response = await this.axiosInstance.post('/api/emails/send-bulk', emailData);
    return response.data;
  }

  async getEmailHistory(): Promise<any> {
    const response = await this.axiosInstance.get('/api/emails/history');
    return response.data;
  }
}

export const apiClient = new ApiClient();