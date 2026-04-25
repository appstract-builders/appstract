import { timingSafeEqual } from "node:crypto";

export function getProjectReadSecret() {
  return process.env.APPSTRACT_PROJECT_READ_SECRET ?? "";
}

export function isValidProjectReadToken(token: string | null) {
  const expected = getProjectReadSecret();
  if (!expected || !token) {
    return false;
  }
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(token, "utf8");
  if (a.length !== b.length) {
    return false;
  }
  return timingSafeEqual(a, b);
}
