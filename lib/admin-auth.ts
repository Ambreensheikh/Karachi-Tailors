import { cookies } from "next/headers";

const SESSION_COOKIE = "admin_session";

// Password check with fallback verification
export function verifyPassword(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    console.error("ADMIN_PASSWORD is not set in environment variables!");
    return false;
  }
  return password === adminPassword;
}

// Create Session
export async function createSession() {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax", // 'strict' ke bajaye 'lax' use karein redirect loops se bachne ke liye
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  });
}

// Check Auth
export async function isAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value === "authenticated";
}

// Logout
export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}