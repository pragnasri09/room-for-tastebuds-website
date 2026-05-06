// Local demo admin auth — stored in localStorage. NOT secure; for owner-only local use.
const KEY = "rft_admin_session";
export const ADMIN_USER = "admin";
export const ADMIN_PASS = "tastebuds2024";

export function login(user: string, pass: string) {
  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    localStorage.setItem(KEY, "1");
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem(KEY);
}

export function isLoggedIn() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(KEY) === "1";
}
