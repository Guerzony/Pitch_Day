import { Buffer } from "buffer";

export function decodeJWT(token: string) {
  const parts = token
    .split(".")
    .map((part) =>
      Buffer.from(
        part.replace(/-/g, "+").replace(/_/g, "/"),
        "base64"
      ).toString()
    );
  const payload = JSON.parse(parts[1]);

  return payload;
}
