import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

/**
 * A class that can provide intellisense for Angular component `templateUrl`.
 */
export class TemplateUrlIntellisenseProvider
    implements vscode.DefinitionProvider, vscode.HoverProvider {
  /**
   * Provide the definition of the symbol at the given position and document.
   *
   * @param document The document in which the command was invoked.
   * @param position The position at which the command was invoked.
   * @return A definition. The lack of a result can be signaled by returning `undefined` or `null`.
   */
  provideDefinition(
      document: vscode.TextDocument,
      position: vscode.Position,
    ): vscode.ProviderResult<vscode.Definition> {
    // Get the template HTML file path.
    const templateFilePath = this.getTemplateFilePath(document, position);

    if (templateFilePath === null) {
      // No template file available. We cannot provide a definition.
      return null;
    }

    // Return a `vscode.Definition` (i.e. a single `vscode.Location`) matching the whole template
    // HTML file.
    const definitionUri = vscode.Uri.file(templateFilePath);
    const definitionPos = new vscode.Position(0, 0);

    return new vscode.Location(definitionUri, definitionPos);
  }

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
    // Get the template HTML file path.
    const templateFilePath = this.getTemplateFilePath(document, position);

    if (templateFilePath === null) {
      // No template file available. We cannot provide a hover.
      return null;
    }

    // Read the template HTML content.
    const templateCode = fs.readFileSync(templateFilePath, 'utf8');

    // Return a `vscode.Hover` with the content of the component template formatted as HTML.
    return new vscode.Hover({language: 'html', value: templateCode});
  }

  /**
   * Get the template HTML file path, if the specified document/position correspond to a
   * `templateUrl` line in an Angular `@Component()` decorator.
   *
   * @param document The document in which the command was invoked.
   * @param position The position at which the command was invoked.
   * @return The template file path or `null` if the specified document/position do not correspond
   *     to a `templateUrl` line or the template file does not exist.
   */
  getTemplateFilePath(document: vscode.TextDocument, position: vscode.Position): string | null {
    // Get the target line.
    const line = document.lineAt(position);

    // Check whether the line is a `templateUrl` line of the `@Component()` decorator and extract
    // the template URL.
    // (This is not a perfect RegExp, but is good enough for demonstration purposes.)
    const templateMatch = /templateUrl:\s+["'](.+)["']/.exec(line.text);

    if (templateMatch === null) {
      // No match. We should not return a file path.
      return null;
    }

    // Resolve the path to the template HTML file.
    const relativeTemplatePath = templateMatch[1];
    const absoluteComponentDir = path.dirname(document.fileName);
    const absoluteTemplatePath = path.resolve(absoluteComponentDir, relativeTemplatePath);

    if (!fs.existsSync(absoluteTemplatePath)) {
      // The template file does not exist. We should not return a file path.
      return null;
    }

    return absoluteTemplatePath;
  }
}
