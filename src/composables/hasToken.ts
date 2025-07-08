import { useCookie } from "#app";

export function hasToken() {
  const token = useCookie("token").value;
  return token !== null && token !== undefined && token !== "";
}
