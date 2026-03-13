# idforge

> A lightweight, zero-dependency UUID v4 generator — forge your own IDs.

**idforge** is a drop-in replacement for the `uuidv4` npm package. It uses Node.js's built-in `crypto` module to produce cryptographically strong, RFC 4122-compliant UUID v4 strings with no external runtime dependencies.

## Installation

```bash
npm install idforge
```

## Usage

### Generate a UUID v4

```ts
import { uuidv4 } from 'idforge';

const id = uuidv4();
console.log(id); // e.g. "a3bb189e-8bf9-4888-9912-ace4e6543002"
```

### Validate a UUID v4

```ts
import { isUuidV4 } from 'idforge';

isUuidV4('a3bb189e-8bf9-4888-9912-ace4e6543002'); // true
isUuidV4('not-a-uuid');                            // false
```

### CommonJS

```js
const { uuidv4, isUuidV4 } = require('idforge');
```

## API

### `uuidv4(): string`

Returns a new UUID version 4 string in the format `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.

- Uses `crypto.randomBytes` for cryptographically strong randomness.
- Sets the version nibble to `4` and the variant bits per RFC 4122.

### `isUuidV4(value: string): boolean`

Returns `true` if `value` is a valid UUID v4 string, `false` otherwise. Accepts both lower-case and upper-case hex digits.

## Why idforge?

| Feature               | idforge | uuidv4 |
|-----------------------|---------|--------|
| Zero runtime deps     | ✅      | ❌     |
| TypeScript-first      | ✅      | ✅     |
| ESM + CJS             | ✅      | ✅     |
| Built-in validation   | ✅      | ❌     |
| Cryptographically secure | ✅   | ✅     |

## License

MIT
