import { test } from "node:test";
import assert from "node:assert";
import { getStoryCanvas } from "./lib.mjs";
import { MD_RESULT_FIXTURE } from "./fixture/mdresult.js";
const FIXTURE_TARGET_PATH =
  "/Users/aleksandrpozdnakov/Desktop/Work/t1digital/antd-doc-migration-script/fixture/components/component";

// test("should return three files", (t) => {
//   getMDFiles('./fixture/components/component').then((result) => assert.equal(result.length, 3))
// });

// test("should return only md files", async (t) => {
//   const result = await getMDFiles('./fixture/components/component');
//   console.log(result)
//         assert.equal(
//           result.reduce((acc, curr) => (acc = (acc ? acc : '').concat(curr.split('.')[1]), acc), ''),
//           'mdmdmd'
//         )
// });

// test("should return aggregated md content", async () => {
//     const result = await getGeneratedMarkdown(FIXTURE_TARGET_PATH);
//     assert.equal(result, MD_RESULT_FIXTURE);

// })
test("should return story", async () => {
  const result = getStoryCanvas("component", "Component description");
  assert.equal(
    result,
    `
    ## Component

    Component description

    <Canvas>
      <Story
          name="Component"
          parameters={{
              docs: { source: { type: 'code' } },
              chromatic: { disableSnapshot: false },
          }}
      >
          <ComponentStory
      </Story>
    </Canvas>
  `,
  );
});
