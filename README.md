# idforge

> v0.0.0 — A custom unique ID generator with **zero runtime dependencies**.

No `uuidv4`, no `nanoid`, no third-party packages needed at runtime.  
Everything is built from scratch on top of the Web Crypto API that ships with Node.js ≥ 15.

---

## Functions

### `generateUUID(): string`

Returns a standards-compliant **UUID v4** string
(`xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`) generated entirely from
`crypto.getRandomValues`.

```ts
import { generateUUID } from "idforge";

generateUUID(); // "f47ac10b-58cc-4372-a567-0e02b2c3d479"
```

### `generateNanoId(size?: number): string`

Returns a compact, **URL-safe** random identifier of `size` characters
(default **21**) drawn from `A-Z a-z 0-9 _ -`.

```ts
import { generateNanoId } from "idforge";

generateNanoId();    // "dBj8yK-mRqNsW_fXtL7Oe"
generateNanoId(10);  // "aB3_xZ-Kqp"
```

### `generateReadableId(): string`

Returns a **human-readable** identifier in the form
`<adjective>-<noun>-<4-hex-suffix>`.

```ts
import { generateReadableId } from "idforge";

generateReadableId(); // "swift-river-3a9f"
```

---

## Installation

```bash
npm install idforge
```

## Usage

```ts
import { generateUUID, generateNanoId, generateReadableId } from "idforge";
```

## Development

```bash
npm install          # install dev dependencies (TypeScript only)
npm run build        # compile to dist/
npm test             # run tests with Node's built-in test runner
npm run lint         # type-check with tsc --noEmit
```

## License

MIT
