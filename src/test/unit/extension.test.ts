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
  });
});
