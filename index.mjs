import { readdir, readFile } from 'node:fs/promises';
import { join } from 'path';

function ReadComponentsDir(targetDirectory) {
	return readdir(targetDirectory).then((componentsDirectories) =>
		Promise.all(
			componentsDirectories.map((componentDirectory) =>
				readdir(join(targetDirectory, componentDirectory, 'demo'))
					.then((files) =>
						Promise.all(
							files.map((file) =>
								readFile(join(targetDirectory, componentDirectory, 'demo', file), {
									encoding: 'utf8',
								}).then((content) => ({ fileName: file, content }))
							)
						)
					)
					.then((files) => ({
						dirName: componentDirectory,
						files,
					}))
			)
		)
	);
}

export function main(targetDirectory) {
	return ReadComponentsDir(targetDirectory).then(
		(result) => (console.log({ files: result[0] }), result)
	);
}

/**
 * Input Layer Result
 * ComponentDir {
 *  dirName string;
 *  files Array<File>
 * }
 *
 * File {
 *  fileName string
 *  content: string
 * }
 */
