import { cookies } from "next/headers";

export default function getToken() {
  const cookieStore = cookies();
  const cookieName = "next-auth.session-token";

  const getSecureToken = cookieStore.get(`__Secure-${cookieName}`);
  const getNotSecureToken = cookieStore.get(cookieName);

  const token = getSecureToken ?? getNotSecureToken;

  if (!token) {
    return "";
  }

  return token.value;
}
