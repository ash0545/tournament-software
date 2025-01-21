"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "../firebase/auth";
import { setCookie, deleteCookie } from "cookies-next";

interface AuthContextType {
  user: any | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in
        const token = await user.getIdToken();
        setCookie("firebase-token", token, {
          secure: true,
          sameSite: "strict",
        });
        setUser(user);

        if (window.location.pathname === "login") {
          router.push("/");
        }
      } else {
        // User is signed out
        deleteCookie("firebase-token");
        setUser(null);

        if (window.location.pathname !== "login") {
          router.push("/login");
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
