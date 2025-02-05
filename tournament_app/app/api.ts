import { auth } from "@/components/lib/firebase/client-app";
import { API_BASE_URL as BASE_URL } from "@/components/api/config";

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User is not authenticated");

  const token = await user.getIdToken();

  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching ${endpoint}: ${response.statusText}`);
  }

  return response.json();
};
