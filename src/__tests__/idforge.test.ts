import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { generateUUID, generateNanoId, generateReadableId } from "../index.ts";

// ---------------------------------------------------------------------------
// generateUUID
// ---------------------------------------------------------------------------
describe("generateUUID", () => {
  it("returns a string matching the UUID v4 pattern", () => {
    const uuid = generateUUID();
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
    assert.match(uuid, uuidRegex, `UUID "${uuid}" does not match v4 pattern`);
  });

  it("produces unique values on successive calls", () => {
    const ids = new Set(Array.from({ length: 1000 }, () => generateUUID()));
    assert.equal(ids.size, 1000, "Expected 1000 unique UUIDs");
  });

  it("has correct length (36 characters including hyphens)", () => {
    assert.equal(generateUUID().length, 36);
  });

  it("has hyphens at positions 8, 13, 18, 23", () => {
    const uuid = generateUUID();
    assert.equal(uuid[8], "-");
    assert.equal(uuid[13], "-");
    assert.equal(uuid[18], "-");
    assert.equal(uuid[23], "-");
  });
});

// ---------------------------------------------------------------------------
// generateNanoId
// ---------------------------------------------------------------------------
describe("generateNanoId", () => {
  const SAFE_ALPHABET = /^[A-Za-z0-9_-]+$/;

  it("returns 21 characters by default", () => {
    assert.equal(generateNanoId().length, 21);
  });

  it("respects a custom size parameter", () => {
    assert.equal(generateNanoId(10).length, 10);
    assert.equal(generateNanoId(36).length, 36);
  });

  it("only contains URL-safe characters", () => {
    for (let i = 0; i < 100; i++) {
      const id = generateNanoId();
      assert.match(id, SAFE_ALPHABET, `NanoId "${id}" contains unsafe chars`);
    }
  });

  it("produces unique values on successive calls", () => {
    const ids = new Set(Array.from({ length: 1000 }, () => generateNanoId()));
    assert.equal(ids.size, 1000, "Expected 1000 unique NanoIds");
  });
});

// ---------------------------------------------------------------------------
// generateReadableId
// ---------------------------------------------------------------------------
describe("generateReadableId", () => {
  it("matches the pattern <word>-<word>-<4-hex-chars>", () => {
    const pattern = /^[a-z]+-[a-z]+-[0-9a-f]{4}$/;
    const id = generateReadableId();
    assert.match(id, pattern, `ReadableId "${id}" does not match expected pattern`);
  });

  it("produces unique values on successive calls", () => {
    const ids = new Set(
      Array.from({ length: 500 }, () => generateReadableId())
    );
    // With 48 adjectives × 48 nouns × 65536 suffixes there is essentially no
    // chance of collision in 500 draws.
    assert.ok(ids.size > 490, `Expected high uniqueness, got ${ids.size}/500`);
  });

  it("always has exactly two hyphens", () => {
    for (let i = 0; i < 50; i++) {
      const id = generateReadableId();
      const hyphenCount = (id.match(/-/g) ?? []).length;
      assert.equal(hyphenCount, 2, `Expected 2 hyphens in "${id}"`);
    }
  });
});
