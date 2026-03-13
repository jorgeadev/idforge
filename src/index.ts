/**
 * idforge — custom unique ID generator.
 *
 * Generates unique identifiers using the Web Crypto API (available in
 * Node.js ≥ 15) so no third-party libraries are required.
 */

/**
 * Formats an array of random bytes as a lowercase hexadecimal string.
 */
function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Generates 16 cryptographically-random bytes and returns them as a
 * 32-character lowercase hex string (128 bits of entropy).
 */
function randomBytes16(): Uint8Array {
  const buf = new Uint8Array(16);
  globalThis.crypto.getRandomValues(buf);
  return buf;
}

/**
 * Generates a UUID v4-formatted identifier without relying on any
 * external library.  The format is:
 *   xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
 * where `4` fixes the version nibble and `y` is one of 8, 9, a, or b
 * (variant 1 / RFC 4122).
 */
export function generateUUID(): string {
  const bytes = randomBytes16();

  // Set version 4 (bits 12-15 of byte 6)
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  // Set variant 1 (bits 6-7 of byte 8)
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = bytesToHex(bytes);
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    hex.slice(12, 16),
    hex.slice(16, 20),
    hex.slice(20, 32),
  ].join("-");
}

/**
 * Generates a compact, URL-safe unique identifier composed of 21
 * random characters drawn from a URL-safe alphabet (A-Z a-z 0-9 _ -).
 * Inspired by NanoID's approach but implemented from scratch.
 *
 * @param size - number of characters to generate (default: 21)
 */
export function generateNanoId(size = 21): string {
  const ALPHABET =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";
  // Alphabet has exactly 64 characters; 256/64 = 4 exactly, so the bitmask
  // produces a perfectly uniform distribution with no modulo bias.
  const mask = ALPHABET.length - 1; // 63 — fits in 6 bits

  const bytes = new Uint8Array(size);
  globalThis.crypto.getRandomValues(bytes);

  return Array.from(bytes)
    .map((b) => ALPHABET[b & mask])
    .join("");
}

/**
 * Generates a human-readable unique identifier in the form:
 *   <adjective>-<noun>-<4-digit-hex-suffix>
 *
 * e.g. "swift-river-3a9f"
 *
 * The word lists are intentionally short and self-contained — no
 * external data files or libraries are used.
 */

const ADJECTIVES: readonly string[] = [
  "amber", "bold", "calm", "dark", "eager", "fast", "gold", "happy",
  "icy", "jolly", "keen", "lush", "misty", "noble", "open", "proud",
  "quiet", "rapid", "sharp", "tall", "urban", "vivid", "warm", "young",
  "zesty", "brave", "crisp", "deft", "epic", "firm", "glad", "high",
  "iron", "jade", "kind", "loud", "mint", "neat", "odd", "pink",
  "rich", "safe", "teal", "vast", "wild", "xtreme", "yummy", "zero",
];

const NOUNS: readonly string[] = [
  "anchor", "blaze", "coast", "drift", "ember", "flame", "grove", "haven",
  "inlet", "jewel", "knoll", "lance", "marsh", "nexus", "orbit", "plain",
  "quill", "ridge", "storm", "tower", "unite", "vault", "whirl", "xenon",
  "yield", "zenith", "abyss", "brook", "cliff", "delta", "epoch", "forge",
  "glade", "hedge", "ivory", "joust", "karma", "lunar", "manor", "north",
  "oasis", "prism", "quest", "realm", "shore", "thorn", "umbra", "vigil",
];

function randomIndex(max: number): number {
  // Use a single random byte; loop to avoid modulo bias
  const buf = new Uint8Array(1);
  let value: number;
  do {
    globalThis.crypto.getRandomValues(buf);
    value = buf[0];
  } while (value >= Math.floor(256 / max) * max);
  return value % max;
}

export function generateReadableId(): string {
  const adj = ADJECTIVES[randomIndex(ADJECTIVES.length)];
  const noun = NOUNS[randomIndex(NOUNS.length)];
  const suffixBuf = new Uint8Array(2);
  globalThis.crypto.getRandomValues(suffixBuf);
  const suffix = bytesToHex(suffixBuf);
  return `${adj}-${noun}-${suffix}`;
}

export default { generateUUID, generateNanoId, generateReadableId };
