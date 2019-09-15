import * as path from 'path';

import { runTests } from 'vscode-test';

async function main() {
  try {
    // The VS Code version to use. (Default: latest stable release)
    const version = process.argv[2];

    // The folder containing the Extension Manifest package.json
    // Passed to `--extensionDevelopmentPath`
    const extensionDevelopmentPath = path.resolve(__dirname, '../../');

    // The path to test runner
    // Passed to --extensionTestsPath
    const extensionTestsPath = path.resolve(__dirname, './e2e/index');

    // Download VS Code, unzip it and run the integration test
    await runTests({
      version,
      extensionDevelopmentPath,
      extensionTestsPath,
      launchArgs: [
        path.resolve(__dirname, '../../fixtures/simple-component/'),
        '--disable-extensions',
      ],
    });
  } catch (err) {
    console.error('Failed to run tests');
    process.exit(1);
  }
}

main();
