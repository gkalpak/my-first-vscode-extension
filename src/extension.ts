// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {TemplateUrlIntellisenseProvider} from './template-url-intellisense-provider';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "my-first-vscode-extension" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  context.subscriptions.push(vscode.commands.registerCommand('extension.helloWorld', () => {
    // The code you place here will be executed every time your command is executed

    // Display a message box to the user
    const words = [];
    words[0] = 'Hello';
    words[1] = 'Angular!';
    vscode.window.showInformationMessage(words.join(', '));
  }));

  // A `vscode.DocumentSelector` to target TypeScript files that have a `.component.ts` suffix.
  // (Limiting the targeted files improves performance by avoiding unnecessary work on other files.)
  const componentTsFileSelector: vscode.DocumentSelector = {
    language: 'typescript',
    pattern: '**/*.component.ts',
    scheme: 'file',
  };
  const templateUrlIntellisenseProvider = new TemplateUrlIntellisenseProvider();

  // Register a `HoverProvider` for Angular component templates and add the registration to the
  // extension's subscriptions (to be automatically cleaned up on deactivation).
  context.subscriptions.push(vscode.languages.registerHoverProvider(
      componentTsFileSelector, templateUrlIntellisenseProvider));

  // Register a `DefinitionProvider` for Angular component templates and add the registration to the
  // extension's subscriptions (to be automatically cleaned up on deactivation).
  context.subscriptions.push(vscode.languages.registerDefinitionProvider(
      componentTsFileSelector, templateUrlIntellisenseProvider));
}

// this method is called when your extension is deactivated
export function deactivate() {}
