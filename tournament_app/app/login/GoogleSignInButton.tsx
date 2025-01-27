"use client";

import React, { useEffect } from "react";

import { Button } from "@/components/ui/button";

import { auth } from "@/components/lib/firebase/client-app";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { createSession } from "@/components/lib/actions/auth-actions";

function GoogleSignInButton() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  const router = useRouter();
  useEffect(() => {
    if (!loading && user) {
      router.push("/");
    }
  }, [user, loading, router]);

  const handleSignIn = async () => {
    try {
      const res = await signInWithGoogle();
      if (res) {
        const token = await res.user.getIdToken();
        await createSession(token);
        router.push("/");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Button variant="secondary" className="w-full" onClick={handleSignIn}>
      <img src="/google.svg" /> Login with Google
    </Button>
  );
}

export default GoogleSignInButton;
