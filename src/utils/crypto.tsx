import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

const algorithm = "aes-256-cbc";
const hashKey = process.env.HASH_KEY;
if (!hashKey) {
  throw new Error("HASH_KEY não está definida no ambiente");
}

const key = Buffer.from(hashKey, "hex");

export function encrypt(text: string) {
  const iv = randomBytes(16); // 16 bytes
  const cipher = createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
  return {
    encryptedData: encrypted.toString("hex"),
    iv: iv.toString("hex")
  };
}

export function decrypt(encryptedData: string, ivHex: string) {
  const iv = Buffer.from(ivHex, "hex");
  const decipher = createDecipheriv(algorithm, key, iv);
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedData, "hex")),
    decipher.final()
  ]);
  return decrypted.toString("utf8");
}