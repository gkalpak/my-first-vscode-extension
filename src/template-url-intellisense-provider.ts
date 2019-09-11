import * as fs from 'fs';
import * as path from 'path';
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
    // Get the line being hovered.
    const line = document.lineAt(position);

    // Check whether the line is a `templateUrl` line of the `@Component()` decorator and extract
    // the template URL.
    // (This is not a perfect RegExp, but is good enough for demonstration purposes.)
    const templateMatch = /templateUrl:\s+["'](.+)["']/.exec(line.text);

    if (templateMatch === null) {
      // No match. We cannot provide a hover.
      return null;
    }

    // Resolve the path to the template HTML file.
    const relativeTemplatePath = templateMatch[1];
    const absoluteComponentDir = path.dirname(document.fileName);
    const absoluteTemplatePath = path.resolve(absoluteComponentDir, relativeTemplatePath);

    if (!fs.existsSync(absoluteTemplatePath)) {
      // The template file does not exist. We cannot provide a hover.
      return null;
    }

    // Read the template HTML content.
    const templateCode = fs.readFileSync(absoluteTemplatePath, 'utf8');

    // Return a `vscode.Hover` with the content of the component template formatted as HTML.
    return new vscode.Hover({language: 'html', value: templateCode});
  }
}
