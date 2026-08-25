import type { Screenplay } from '../types/script';

const API_BASE_URL = 'http://localhost:5000/api';

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  role: string;
}

export interface DispatchedEmail {
  id: string;
  userId: string;
  recipientEmail: string;
  subject: string;
  htmlBody: string;
  category: string;
  sentAt: string;
}

class ApiService {
  private getToken(): string | null {
    return localStorage.getItem('scriptforge_auth_token');
  }

  public setToken(token: string) {
    localStorage.setItem('scriptforge_auth_token', token);
  }

  public removeToken() {
    localStorage.removeItem('scriptforge_auth_token');
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = this.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Network request failed');
    }

    return data;
  }

  // Auth APIs
  public async signup(username: string, email: string, password: string):Promise<{ token: string; user: UserProfile; message: string; emailNotification: any }> {
    const res = await this.request<{ token: string; user: UserProfile; message: string; emailNotification: any }>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    });
    this.setToken(res.token);
    return res;
  }

  public async login(usernameOrEmail: string, password: string): Promise<{ token: string; user: UserProfile; message: string; emailNotification: any }> {
    const res = await this.request<{ token: string; user: UserProfile; message: string; emailNotification: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ usernameOrEmail, password }),
    });
    this.setToken(res.token);
    return res;
  }

  public async demoLogin(): Promise<{ token: string; user: UserProfile; message: string; emailNotification: any }> {
    const res = await this.request<{ token: string; user: UserProfile; message: string; emailNotification: any }>('/auth/demo', {
      method: 'POST',
    });
    this.setToken(res.token);
    return res;
  }

  public async getMe(): Promise<{ user: UserProfile }> {
    return this.request<{ user: UserProfile }>('/auth/me');
  }

  public async logout(): Promise<{ message: string }> {
    try {
      await this.request<{ message: string }>('/auth/logout', { method: 'POST' });
    } finally {
      this.removeToken();
    }
    return { message: 'Logged out' };
  }

  // Scripts APIs
  public async getScripts(): Promise<{ scripts: Screenplay[] }> {
    return this.request<{ scripts: Screenplay[] }>('/scripts');
  }

  public async createScript(scriptData: Partial<Screenplay>): Promise<{ script: Screenplay; message: string }> {
    return this.request<{ script: Screenplay; message: string }>('/scripts', {
      method: 'POST',
      body: JSON.stringify(scriptData),
    });
  }

  public async getScriptById(id: string): Promise<{ script: Screenplay }> {
    return this.request<{ script: Screenplay }>(`/scripts/${id}`);
  }

  public async updateScript(id: string, updates: Partial<Screenplay>): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/scripts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  public async deleteScript(id: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/scripts/${id}`, {
      method: 'DELETE',
    });
  }

  // Emails APIs
  public async getEmails(): Promise<{ emails: DispatchedEmail[] }> {
    return this.request<{ emails: DispatchedEmail[] }>('/emails');
  }
}

export const api = new ApiService();
