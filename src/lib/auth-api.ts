const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:8000/api' : 'http://127.0.0.1:8000/api';

interface User {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
}

interface AuthResponse {
  user: User;
  message: string;
}

interface ErrorResponse {
  error: string;
}

class AuthAPI {
  private csrfToken: string | null = null;

  async getCsrfToken(): Promise<string> {
    if (this.csrfToken) {
      return this.csrfToken;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/csrf/`, {
        credentials: 'include',
      });
      const data = await response.json();
      this.csrfToken = data.csrfToken;
      return this.csrfToken;
    } catch (error) {
      console.error('Error getting CSRF token:', error);
      throw error;
    }
  }

  async login(email: string, password: string): Promise<{ user?: User; error?: string }> {
    try {
      const csrfToken = await this.getCsrfToken();
      
      const response = await fetch(`${API_BASE_URL}/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.error || 'Login failed' };
      }

      return { user: data.user };
    } catch (error) {
      console.error('Login error:', error);
      return { error: 'Network error occurred' };
    }
  }

  async register(email: string, password: string, firstName?: string, lastName?: string): Promise<{ user?: User; error?: string }> {
    try {
      const csrfToken = await this.getCsrfToken();
      
      const response = await fetch(`${API_BASE_URL}/auth/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify({ 
          email, 
          password, 
          first_name: firstName || '', 
          last_name: lastName || '' 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.error || 'Registration failed' };
      }

      return { user: data.user };
    } catch (error) {
      console.error('Registration error:', error);
      return { error: 'Network error occurred' };
    }
  }

  async logout(): Promise<{ error?: string }> {
    try {
      const csrfToken = await this.getCsrfToken();
      
      const response = await fetch(`${API_BASE_URL}/auth/logout/`, {
        method: 'POST',
        headers: {
          'X-CSRFToken': csrfToken,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      this.csrfToken = null; // Reset CSRF token
      return {};
    } catch (error) {
      console.error('Logout error:', error);
      return { error: 'Logout failed' };
    }
  }

  async getCurrentUser(): Promise<{ user?: User; error?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me/`, {
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: 'Failed to get current user' };
      }

      return { user: data.user };
    } catch (error) {
      console.error('Get current user error:', error);
      return { error: 'Network error occurred' };
    }
  }
}

export const authAPI = new AuthAPI();
export type { User, AuthResponse, ErrorResponse };