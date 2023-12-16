"use strict";
import { readdir, readFile } from "node:fs/promises";
import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve, isAbsolute } from "path";
import { URL } from "node:url";

process.argv.forEach(function (val, index, array) {
  console.log(index + ": " + val);
});

const __dirname = new URL(".", import.meta.url).pathname;

const getMdFilesContent = (fileNames, dirPath) =>
  fileNames
    .reduce((acc, fileName) => {
      console.log({ fileName, dirPath });
      if (fileName.split(".")[1] === "md") {
        const resultContent = readFileSync(join(dirPath, fileName), {
          encoding: "utf-8",
        });
        console.log({
          resultContent: resultContent.split("\n").filter(Boolean)[3],
        });
        acc.push(resultContent);
      }
      return acc;
    }, [])
    .join();

const getMdFiles = (fileNames, path) => fileNames.reduce();

const withExtension = (fileName, extension) =>
  fileName.concat(".").concat(extension);

const writeMDXStory = (fileName, content) =>
  writeFileSync(
    withExtension(fileName, "md"),
    content,
    { flag: "w" },
    (err) => {
      if (err) console.log({ err });
      console.log("generated");
    },
  );

export function getGeneratedMarkdown(dirPath) {
  const workingDIR = join(dirPath, "demo");
  console.log({ workingDIR });
  return readdir(workingDIR)
    .then((filePathes) => getMdFilesContent(filePathes, workingDIR))
    .then(
      (result) => (
        console.log({ result }), writeMDXStory("component", result), result
      ),
    );
}

export function ReadFilesInDir(workingDIR) {
  const workingDIR = join(dirPath, "demo");
  readdir(workingDIR).then();
}

export function ReadComponentsDir(targetDirectory) {
  return readdir(targetDirectory).then((componentsDirectories) =>
    Promise.all(
      componentsDirectories.map((componentDirectory) =>
        readdir(join(targetDirectory, componentDirectory, "demo")),
      ),
    ),
  );
}

const capitalize = ([first, ...rest]) =>
  first.toUpperCase() + rest.join("").toLowerCase();

const ComponentStoryName = (componentName) => componentName.concat("Story");

export function getStory(fileName, mdFileNames) {
  const ComponentName = capitalize(fileName);

  return `
  import { ${ComponentName} } from 'antd';
  ${mdFileNames.map(
    (fileName) => `
  import ${ComponentStoryName(
    capitalize(fileName),
  )} from './stories/${fileName}';
  `,
  )}

  <Meta
    title="General/${ComponentName}"
    component={${ComponentName}}
  />

  # ${ComponentName}

  ${mdFileNames.map(
    (fileName) => `
    ## ${capitalize(fileName)}

    description

    <Canvas>
      <Story
          name="${storyName}"
          parameters={{
              docs: { source: { type: 'code' } },
              chromatic: { disableSnapshot: false },
          }}
      >
          <${ComponentStoryName(capitalize(fileName))} />
      </Story>
    </Canvas>
  `,
  )}
  `;
}

export function getStoryCanvas(name, description) {
  const storyName = capitalize(name);
  const componentName = storyName.concat("Story"); // need to import in the global story

  return `
    ## ${storyName}

    ${description}

    <Canvas>
      <Story
          name="${storyName}"
          parameters={{
              docs: { source: { type: 'code' } },
              chromatic: { disableSnapshot: false },
          }}
      >
          <${componentName}
      </Story>
    </Canvas>
  `;
}

/**
 * Types:
 * File {
 *  content: string;
 *  name: string;
 * }
 * Side-effect Input Layer:
 * - [ ] Read Args
 * - [ ] Read target directory
 * - [ ] Read files
 *
 * Pure Layer:
 * - [+] Concat markdown with story canvas template
 * - [ ] Concat makrdowns
 * - [ ] Create Meta
 * - [ ] Concat all to template
 * - [ ] Add Imports
 *
 * Side-effect Output Layer:
 * - [ ] Create directories
 * - [ ] Write result to file
 * - [ ] Copy tsx files
 */

// getMDFiles(process.argv[2]).then((mdFiles) => console.log({mdFiles}));
