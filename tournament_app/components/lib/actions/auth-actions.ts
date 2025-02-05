"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createSession(uid: string) {
  const cookieStore = await cookies();
  cookieStore.set("firebase-token", uid, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // One day
    path: "/",
  });

  redirect("/");
}

export async function removeSession() {
  (await cookies()).delete("firebase-token");

  redirect("/login");
}
