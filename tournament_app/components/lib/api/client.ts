import { ApiResponse } from "./types";
import { API_BASE_URL } from "./config";
import { auth } from "../firebase/clientApp";

class ApiClient {
  private async getHeaders(): Promise<Headers> {
    const headers = new Headers({
      "Content-Type": "application/json",
    });

    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      headers.append("Authorization", `Bearer ${token}`);
    }

    return headers;
  }

  async get<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const headers = await this.getHeaders();
      const response = await fetch(`${API_BASE_URL}/${url}`, {
        headers,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return {
        data: null as T,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async post<T>(url: string, body: any): Promise<ApiResponse<T>> {
    try {
      const headers = await this.getHeaders();
      const response = await fetch(`${API_BASE_URL}/${url}`, {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return {
        data: null as T,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}

export const apiClient = new ApiClient();
