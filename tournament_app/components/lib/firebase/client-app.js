import { initializeApp, getApps, getApp } from "firebase/app";
import { firebaseConfig } from "./config";
import { getAuth } from "firebase/auth";

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);

export { app, auth };
