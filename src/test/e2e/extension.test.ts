import * as assert from 'assert';
import { afterEach, beforeEach } from 'mocha';
import * as path from 'path';
import * as sinon from 'sinon';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../extension';

suite('Extension Test Suite', () => {
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  suite('`extension.helloWorld` command', () => {
    test('shows a notification', async () => {
      const spy = sandbox.stub(vscode.window, 'showInformationMessage');
      await vscode.commands.executeCommand('extension.helloWorld');

      assert(spy.calledWith('Hello, Angular!'));
    });
  });

  suite('on hover', () => {
    test('shows the template content when hovering over `templateUrl`', async () => {
      const filePath = path.resolve(
          __dirname, '../../../fixtures/simple-component/simple.component.ts');

      const [hover] = await vscode.commands.executeCommand(
          'vscode.executeHoverProvider',
          vscode.Uri.file(filePath),
          new vscode.Position(5, 20),
      ) as vscode.Hover[];
      const hoverContents = (hover.contents[0] as vscode.MarkdownString).value;

      assert.strictEqual(
          hoverContents,
          '```html\n<div class="simple">\n  This is really simple.\n</div>\n\n```\n');
    });
  });
});
