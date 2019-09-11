import * as vscode from 'vscode';

/**
 * A class that can provide intellisense for Angular component `templateUrl`.
 */
export class TemplateUrlIntellisenseProvider implements vscode.HoverProvider {
  /**
   * Provide a hover for the given position and document.
   *
   * @param document The document in which the command was invoked.
   * @param position The position at which the command was invoked.
   * @return A hover. The lack of a result can be signaled by returning `undefined` or `null`.
   */
  provideHover(
      document: vscode.TextDocument,
      position: vscode.Position,
    ): vscode.ProviderResult<vscode.Hover> {
    // TODO: Implement the actual logic.
    return new vscode.Hover('Not implemented.');
  }
}
