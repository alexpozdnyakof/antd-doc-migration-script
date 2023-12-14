import { test } from "node:test";
import assert from "node:assert";
import { add } from "./lib.mjs";

test("synchronous passing test", () => {
  assert.strictEqual(add(1, 1), 2);
});

test("synchronous failing test", (t) => {
  // This test fails because it throws an exception.
  assert.strictEqual(add(1, 1), 1);
});
