import { createCipheriv, randomBytes, createDecipheriv } from "crypto";

const algorithm = "aes-256-cbc";
const key = randomBytes(32);
const iv = randomBytes(16);

export function encrypt(text: string) {
  const cipher = createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
  return { encryptedData: encrypted.toString("hex"), iv: iv.toString("hex") };
}

export function decrypt(encryptedData: string, ivHex: string) {
  const decipher = createDecipheriv(algorithm, key, Buffer.from(ivHex, "hex"));
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedData, "hex")),
    decipher.final()
  ]);
  return decrypted.toString("utf8");
}