import * as assert from 'assert';
import {afterEach, beforeEach} from 'mocha';
import * as sinon from 'sinon';
import * as vscode from 'vscode';
import {activate} from '../../extension';

suite('Extension', () => {
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  suite('activate()', () => {
    let mockContext: vscode.ExtensionContext;

    beforeEach(() => {
      mockContext = {subscriptions: []} as any;
      sandbox.stub(console, 'log');
    });

    test('registers an `extension.helloWorld` command', () => {
      const spy = sandbox.stub(vscode.commands, 'registerCommand');
      activate(mockContext);

      assert(spy.calledWith('extension.helloWorld', sinon.match.func));
    });

    test('adds the `extension.helloWorld` command registration to subscriptions', () => {
      const mockRegistration = {dispose: () => undefined};
      sandbox.stub(vscode.commands, 'registerCommand').returns(mockRegistration);
      activate(mockContext);

      assert.strictEqual(mockContext.subscriptions[0], mockRegistration);
    });

    test('shows a notification when running the `extension.helloWorld` command', () => {
      const registerCommandSpy = sandbox.stub(vscode.commands, 'registerCommand');
      const showInformationMessageSpy = sandbox.stub(vscode.window, 'showInformationMessage');
      activate(mockContext);

      const commandCb = registerCommandSpy.args[0][1];
      assert(showInformationMessageSpy.notCalled);

      commandCb();
      assert(showInformationMessageSpy.calledWith('Hello, Angular!'));
    });
  });
});
