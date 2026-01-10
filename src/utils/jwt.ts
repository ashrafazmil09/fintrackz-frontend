export function parseJwt(token: string): { [key: string]: any } | null {
  try {
    const base64Payload = token.split(".")[1];
    const jsonPayload = atob(base64Payload);
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Invalid JWT", e);
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  const payload = parseJwt(token);
  if (!payload?.exp) return true;
  const now = Math.floor(Date.now() / 1000);
  return payload.exp < now;
}

export function getRoleFromToken(token: string): string | null {
  const payload = parseJwt(token);
  return payload?.role || null;
}
