import React from "react";
import { Button } from "@/components/ui/button";
import {
  signInWithGoogle,
  signOut,
  onAuthStateChanged,
} from "@/components/lib/firebase/auth.js";
import { firebaseConfig } from "@/components/lib/firebase/config";

function GoogleSignInButton() {
  const handleSignOut = (event) => {
    event.preventDefault();
    signOut();
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    signInWithGoogle();
  };

  return (
    <Button variant="secondary" className="w-full" onClick={handleSignIn}>
      <img src="/google.svg" /> Login with Google
    </Button>
  );
}

export default GoogleSignInButton;
