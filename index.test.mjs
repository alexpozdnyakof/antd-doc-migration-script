import { test } from "node:test";
import assert from "node:assert";
import { main } from "./index.mjs";
const FIXTURE_TARGET_PATH =
  "/Users/aleksandrpozdnakov/Desktop/Work/t1digital/antd-doc-migration-script/fixture/components";

test("should return files in directories", async () => {
  const result = await main(FIXTURE_TARGET_PATH);
  console.log({ result });
  assert.equal(Boolean(result), true);
});
