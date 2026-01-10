import { API_BASE_URL } from "../config/api";

export async function getCurrentUser() {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      credentials: "include",
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.data || null;
  } catch {
    return null;
  }
}
