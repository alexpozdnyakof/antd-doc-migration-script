import { readdir } from 'node:fs/promises';
import { join } from 'path';

process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});

export function add(x, y){
  return x + y
}

function getMDFiles(path){
  return readdir(join(path, 'demo'))
              .then((fileNames) => fileNames.filter((fileName) => fileName.split('.')[1] === 'md'))
              .catch((error) => console.log(error));
}

getMDFiles(process.argv[2]).then((mdFiles) => console.log({mdFiles}));
