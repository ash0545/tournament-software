import React from "react";
import { Button } from "@/components/ui/button";
import { signInWithGoogle, signOut } from "@/components/lib/firebase/auth";
import { setCookie, deleteCookie } from "cookies-next";

function GoogleSignInButton() {
  const handleSignOut = async (event: React.MouseEvent) => {
    event.preventDefault();
    await signOut();
    deleteCookie("firebase-token");
  };

  const handleSignIn = async (event: React.MouseEvent) => {
    event.preventDefault();
    const result = await signInWithGoogle();
    if (result?.user) {
      const token = await result.user.getIdToken();
      setCookie("firebase-token", token, { secure: true, sameSite: "strict" });
    }
  };

  return (
    <Button variant="secondary" className="w-full" onClick={handleSignIn}>
      <img src="/google.svg" /> Login with Google
    </Button>
  );
}

export default GoogleSignInButton;
