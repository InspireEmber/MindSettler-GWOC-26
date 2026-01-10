"use client";

import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/api";

export function useAdminAuth() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  async function check() {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/me`, {
        credentials: "include",
      });
      if (!res.ok) {
        setIsAdmin(false);
        return;
      }
      const data = await res.json();
      const role = data?.data?.role;
      setIsAdmin(role === "admin");
    } catch {
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    check();
  }, []);

  return { loading, isAdmin };
}