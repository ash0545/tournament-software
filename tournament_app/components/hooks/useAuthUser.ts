import { auth } from "@/components/lib/firebase/client-app";
import { User } from "firebase/auth";
import { useQuery } from "@tanstack/react-query";

// Function to fetch the authenticated user
const fetchAuthUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      resolve(user);
      unsubscribe(); // Unsubscribe immediately after getting the user
    });
  });
};

export function useAuthUser() {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: fetchAuthUser,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    refetchOnWindowFocus: false, // Avoid unnecessary refetches
  });

  return { user, isLoading, error };
}
