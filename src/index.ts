import { randomBytes } from 'crypto';

/**
 * Generates a UUID version 4 (random) string.
 *
 * Uses the built-in `crypto` module for cryptographically strong random values,
 * making this a zero-dependency, secure drop-in replacement for the `uuidv4` package.
 *
 * Format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
 *
 * @returns A UUID v4 string, e.g. `"110e8400-e29b-41d4-a716-446655440000"`
 *
 * @example
 * ```ts
 * import { uuidv4 } from 'idforge';
 *
 * const id = uuidv4();
 * console.log(id); // "a3bb189e-8bf9-4888-9912-ace4e6543002"
 * ```
 */
export function uuidv4(): string {
  const bytes = randomBytes(16);

  // Set the version to 4 (bits 12-15 of time_hi_and_version field)
  bytes[6] = (bytes[6] & 0x0f) | 0x40;

  // Set the variant to RFC 4122 (bits 6-7 of clock_seq_hi_and_reserved field)
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = bytes.toString('hex');

  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    hex.slice(12, 16),
    hex.slice(16, 20),
    hex.slice(20, 32),
  ].join('-');
}

/**
 * Validates whether a given string is a valid UUID v4.
 *
 * @param value - The string to validate.
 * @returns `true` if the string is a valid UUID v4, `false` otherwise.
 *
 * @example
 * ```ts
 * import { isUuidV4 } from 'idforge';
 *
 * isUuidV4('a3bb189e-8bf9-4888-9912-ace4e6543002'); // true
 * isUuidV4('not-a-uuid');                            // false
 * ```
 */
export function isUuidV4(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}
