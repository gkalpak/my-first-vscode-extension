// Exports
export const mockVscode = {
  commands: {
    registerCommand: noop,
  },
  languages: {
    registerDefinitionProvider: noop,
    registerHoverProvider: noop,
  },
  window: {
    showInformationMessage: noop,
  },
};

// Helpers
function noop(): void {
  return;
}
