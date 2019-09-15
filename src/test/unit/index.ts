import * as path from 'path';
import * as Mocha from 'mocha';
import * as mock from 'mock-require';
import * as glob from 'glob';
import {mockVscode} from './vscode.mock';

// `vscode` APIs are only provided when running tests through VS Code (i.e. e2e tests).
// For "standalone" unit tests, we need to mock them.
mock('vscode', mockVscode);

// Create the mocha test
const mocha = new Mocha({
  ui: 'tdd',
});
mocha.useColors(true);

const testsRoot = path.resolve(__dirname);

glob('**/**.test.js', { cwd: testsRoot }, (err, files) => {
  if (err) {
    throw err;
  }

  // Add files to the test suite
  files.forEach(f => mocha.addFile(path.resolve(testsRoot, f)));

  // Run the mocha test
  mocha.run(failures => {
    if (failures > 0) {
      process.exit(1);
    }
  });
});
