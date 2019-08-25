<!--
Event: [Angular Connect 2019](https://www.angularconnect.com/)
Session: [Mini-workshop: Beyond VS Code - Extending your favorite code editor](https://www.angularconnect.com/talks#george-kalpakas)
Instructor: [George Kalpakas](https://twitter.com/gkalpakas)
Repository: [github:my-first-vscode-extension](https://github.com/gkalpak/my-first-vscode-extension)
-->

<a name="top"></a>
# AngularConnect 2019 Mini-workshop:<br />Beyond VS Code - Extending your favorite code editor

[VS Code][vscode] has been taking the dev community by storm, quickly climbing the ranks of popular code editors - especially among front-end developers. One of its most powerful (and often overlooked) features is its extensibility, which allows it to be tailored to the diverse needs and preferences of thousands of developers.

But what if none of the 10000+ freely available extensions does exactly what you want?

In this workshop, you will learn how to take advantage of VS Code's public extensibility model - using the same tools you use for your day-to-day work - and make your (and your team's) dev experience truly yours.

In particular, you will learn (by doing) how to:

- Set up, run and debug a VS Code extension.
- Write unit and end-to-end tests for your extension.
- Package and share your extension with others.

Remember...you are only as good as your tools ;)


## Table of contents

1. [Prerequisites](#prerequisites)
2. [Preparation steps](#preparation-steps)
3. [Introduction](#introduction)
4. [Labs](#labs)
   1. [Lab 1: Scaffold and run a basic extension](#lab-1)
   2. [Lab 2: Understand the extension layout](#lab-2)
   3. [Lab 3: Develop and debug the extension](#lab-3)
   4. [Lab 4: Feature: Show Angular template on hover](#lab-4)
   5. [Lab 5: Feature: Peek/Go to Angular template definition](#lab-5)
   6. [Lab 6: End-to-end (E2E) testing](#lab-6)
   7. [Lab 7: Unit testing](#lab-7)
   8. [Lab 8: Package and share the extension](#lab-8)


<a name="prerequisites"></a>
## Prerequisites

A basic knowledge of the following languages/tools will be assumed during the workshop. You might find it hard to follow along, if you have never heard of/used them.

- Basic knowledge of [TypeScript][typescript].
- Basic knowledge of [Git][git] and [Node.js][node].
- Basic experience of working with [VS Code][vscode].

<p align="right"><sub><a href="#top">Back to top</a></sub></p>


<a name="preparation-steps"></a>
## Preparation steps

If you intend to code along on your laptop (which will help you get the most out of the workshop and is the recommended way to attend), having completed the following steps beforehand will help ensure your environment is set up correctly and you will be able to keep up (even, for example, in the event of a bad/congested internet connection during the workshop).

- Have [Git][git] and [Node.js][node] installed.
  - [Download Git][git-download] (recommended version: 2 or newer)
  - [Download Node.js][node-download] (recommended version: 10 or newer)

- Have [VS Code][vscode] installed.
  - [Download VS Code][vscode-download] (recommended version: 1.37.0 or newer)
  - Optionally, also install the [VS Code TSLint extension][tslint-extension].

- Clone [this GitHub repository][repository].<br />
  Command: `git clone https://github.com/gkalpak/my-first-vscode-extension.git`

- Install dependencies.<br />
  Command: `cd my-first-vscode-extension && npm install`<br />

<p align="right"><sub><a href="#top">Back to top</a></sub></p>


<a name="introduction"></a>
## Introduction


### About VS Code and extensions

VS Code is cross platform desktop application. It is based on [Electron](https://electronjs.org/) and written in TypeScript. What this means, is that the whole editor is basically a big JavaScript application.

<!--
INSTRUCTOR NOTES:
Optionally mention and show DevTools: `Command Palette` > `Toggle Developer Tools`
-->

It has been built with extensibility in mind. It exposes a rich API to extensions, allowing almost every part of it to be customized and enhanced. At the same time, care has been taken to ensure that extensions will not negatively affect the editor's performance (e.g. they run in a different process).

VS Code extensions can be written in TypeScript or JavaScript. There are several different types of extensions. Here are some of the things extensions can do:

- [Theming](https://code.visualstudio.com/api/extension-capabilities/overview#theming):
  Change the look of VS Code with a color or icon theme.
- [Extending workbench](https://code.visualstudio.com/api/extension-capabilities/overview#workbench-extensions):
  Add custom components & views in the UI or create Webviews to display custom webpages built with HTML/CSS/JS.
- [Declarative language features](https://code.visualstudio.com/api/extension-capabilities/overview#declarative-language-features):
  Support a new programming language (by providing features such as syntax highlighting, comment toggling and more).
- [Programmatic language features](https://code.visualstudio.com/api/extension-capabilities/overview#programmatic-language-features):
  Add rich programming language support (by providing features such as intellisense, diagnostic errors, `Go to Definition` and more).
- [Debugging](https://code.visualstudio.com/api/extension-capabilities/overview#debugging):
  Support debugging a specific runtime.

The documentation provided by the VS Code team is covers everything you need to go. The [Extension overview](https://code.visualstudio.com/api) page is a good place to start, if you are looking to learn more.


### About the workshop

In this workshop, we will start with a very basic extension and then enhance it with some simple features that fall under the "programmatic language features category" (see above). We are going to use TypeScript, because it provides a better developer experience and allows exploring unfamiliar APIs more easily.

The workshop is separated in a few self-contained "labs", each tackling a specific topic related to VS Code extension development. The source code can be found in the [my-first-vscode-extension](https://github.com/gkalpak/my-first-vscode-extension) GitHub repository. The code for each lab is spread across one or more commits.

The code itself is not the main focus of the workshop. What's more important is to get a solid understanding of the various tools and processed involved and how efficiently use them to develop your own VS Code extensions.

If you intend to code along during the workshop, it is recommended that you clone the repository and open it in VS Code. There are [Git tags](https://git-scm.com/book/en/v2/Git-Basics-Tagging) corresponding to each lab (`lab-1`, `lab-2`, etc.). Using these tags, you can easily update your local copy to the state it would be after completing the lab. This way, you can continue following along on the next lab, even if you didn't manage to fully complete all previous ones.

For example, to get yourself ready for lab 5, you can run the command: `git checkout --force lab-4`<br />
**WARNING:** Running this command will cause any changes you made within your working directory to be lost.

<!--
INSTRUCTOR NOTES:
Recommend using the integrated terminal (or at least just mention it).
-->

<p align="right"><sub><a href="#top">Back to top</a></sub></p>


<a name="labs"></a>
## Labs

> 💡 **Tip**<br />
> If you have cloned the repository earlier and want to make sure you have the latest changes (and Git tags), run the following commands:
> ```sh
> git fetch --force --tags origin master
> git reset --hard origin/master
> ```

<!--
INSTRUCTOR NOTES:
No need to reinstall the dependencies (unless they have changed recently).
-->


<a name="lab-1"></a>
### Lab 1

**Objective:** Scaffold and run a basic extension.<br />
**Code diff:** https://github.com/gkalpak/my-first-vscode-extension/compare/lab-0...lab-1<br />
**Git tag:** `lab-1`

**Notes:**<br />
The easiest way to create a basic extension is by using [Yeoman][yeoman] and the [VS Code Extension Generator][yeoman-code]:

```sh
npm install --global yo generator-code
yo code
```

By checking out the repository at tag `lab-1` (`git checkout --force lab-1`), you will get the code generated by running the above commands (so you do not need to run them now, but that is how you can scaffold a new extension). The only exception is that this repository includes a `.workshop-infra/` directory, which contains workshop infrastructure related stuff and you should completely ignore. (The scaffolded extension has already been tweaked to ignore that directory.)

Before examining what our extension is made of, let's see it in action.

Inside the editor, press `F5` to launch a new, special VS Code window - called the **Extension Development Host** window - that runs the extension under development. As we will see in the next lab, our extension contibutes a new "Hello World" command. To run it, bring up the Command Palette (`View > Command Palette` or `Ctrl+Shift+P`/`Cmd+Shift+P`) and type "Hello World". Press `ENTER` to see a "Hello World" notification show up.

Congratulations! You just extended VS Code with custom functionality.

**Experiments:** -

**Resources:**
- [VS Code: Extension overview](https://code.visualstudio.com/api):<br />
  _An overview of extensions, what they can do and further resources on how to build one._

- [VS Code: Your first extension](https://code.visualstudio.com/api/get-started/your-first-extension): <br />
  _Instructions on how to start building (and debugging) your first extension._

- [VS Code: Command Palette](https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette): <br />
  _An overview of how to use Command Palette to perform various operations._

<p align="right"><sub><a href="#top">Back to top</a></sub></p>


<a name="lab-2"></a>
### Lab 2

**Objective:** Understand the extension layout.<br />
**Code diff:** -<br />
**Git tag:** -

**Notes:**<br />
Let's now examine the different parts of the extension:

1. Generic project files:
   - `.gitignore`: To configure Git to ignore certain files/directories (such as `node_modules/`).
   - `CHANGELOG.md`: To keep track of notable changes in your project.
   - `package.json`/`package-lock.json`: Metadata about your project, dependencies and custom commands. More on these later.
   - `README.md`: To keep general information about your project.

2. TypeScript-related project files:
   - `tsconfig.json`: To configure the TypeScript compilation (for transpiling our extension code and tests to JavaScript).
   - `tslint.json`: To specifiy linting rules for [TSLint][tslint].

3. VS Code-related files/directories:
   - `.vscode/`: VS Code configuration files (for any type of project; not specific to extensions).
     - `extensions.json`: List of extension recommendations for people working on the project.
     - `launch.json`: List of launch configurations (available in the Debug View) that can be used for [Debugging](https://code.visualstudio.com/docs/editor/debugging).
     - `settings.json`: Project-specific settings (that override global ones).
     - `tasks.json`: List and configuration of external tasks (e.g. npm scripts) for integration with VS Code (e.g. "Run task" command or use in launch configurations). See [here](https://code.visualstudio.com/docs/editor/tasks) from more details.
   - `.vscodeignore`: Similar to `.gitignore` but for excluding files/directories from being included in your extension's package (once you want to package/publish your extension). See [here](https://code.visualstudio.com/api/working-with-extensions/publishing-extension#.vscodeignore) for more details.

4. Project source code:
   - `vsc-extension-quickstart.md`: Basic overview of the extension, quick instructions on how to try it out and ideas for next steps.
   - `src/`: The source code of your extension (and its tests).

You generally don't have to worry about the contents of the above files with the exception of `package.json` and `src/`.

Let's take a closer look at what is in `package.json`. In addition to its regular role in a [Node.js][node]-based project, it also serves as the [Extension Manifest](https://code.visualstudio.com/api/references/extension-manifest) - a special file containing extension-specific metadata, such as the extension name and description, the publisher name, extension icons, the extension's [contributions](https://code.visualstudio.com/api/references/contribution-points) (commands, keybindings, menus, views, etc.), the extension's [activation events](https://code.visualstudio.com/api/references/activation-events) and more.

Looking at specific fields in  our basic extension's `package.json`, we have:

- `scripts: { ... }`: A minimal set of npm scripts for compiling the extension (once or in watch mode) and running tests.

- `engines: {vscode: '^1.37.0'}`: This specifies the minimum version supported by the extension. VS Code will prevent users of older versions from installing the extension, since it might be using VS Code APIs that are not available in their version.

  > 💡 **Tip**<br />
  > The version of `@types/vscode` in `devDependencies` should always match the minimum supported version of VS Code (as specified in `engines.vscode`) to ensure that your extension only uses APIs that will be available at runtime.

- `activationEvents: ['onCommand:extension.helloWorld']`: This specifies that the extension should be activated, when the user invokes the `extension.helloWorld` command (e.g. from the Command Palette).

- `contributes: {commands: [ ... ]}`: This defines the commands contributed by the extension (here just the `extension.helloWorld` command).

  > ✔️ **Best practice**<br />
  > Prefix command names with your extension's ID/name to easily distinguish them from built-in commands or commands contributed by other extensions and avoid name conflicts. E.g.: `my-first-vscode-extension.someCommand`

Let's now look at the `src/` directory layout:

- `extension.ts`: This is the extension's entry point. We will examine it more closely later.
- `test/`: This directory contains code related to testing the extension.
  - `runTest.ts`: The script that kicks off the end-to-end (e2e) tests (used in the `test` npm script in `package.json`).
  - `suite/`
    - `extension.test.ts`: The tests entry point. This file contains the e2e tests (or imports other files that contain tests).
    - `index.ts`: This file configures and starts the test runner (e.g. [Mocha][mocha] or [Jasmine][jasmine]).

Above, we peeked at the `src/test/` directory and mentioned e2e testing. We will ignore testing (and related files) for the time being. We will dive deeper into testing in subsequent labs.

Finally, let's break down the main extension file: `extension.ts`<br />
It exports two functions, `activate` and `deactivate`. `activate` is executed when one of your registered activation events happens and it basically spins up the extension. `deactivate` is called just before the extension becomes deactivated and is a good place to run any necessary clean up.

**Experiments:**
- Examine the contents of the `extension.ts` file.
  - Read the comments to gain a better understanding of what each line of code does.
  - Hover over the various VS Code APIs used (such as `vscode.commands.registerCommand` and `context.subscriptions`) to find out more about their purpose.

- Change the command's name to use the extension's ID as prefix (instead of the generic `extension.` prefix).
  - Find the extension's ID/name in `package.json > name`.
  - Update the command name in all necessary locations (in both `extension.ts` _and_ `package.json`).
  - Run the extension (`F5`) and invoke the "Hello World" command to make sure everything still works correctly.

**Resources:**
- [VS Code: Extension anatomy](https://code.visualstudio.com/api/get-started/extension-anatomy):<br />
  _An overview of the various files included in a basic extension and further resources with more in-depth information._

<p align="right"><sub><a href="#top">Back to top</a></sub></p>


<a name="lab-3"></a>
### Lab 3

**Objective:** Develop and debug the extension.<br />
**Code diff:** https://github.com/gkalpak/my-first-vscode-extension/compare/lab-1...lab-3<br />
**Git tag:** `lab-3`

**Notes:**<br />
When you want to work on the extension, you can first launch a **Extension Development Host** window, by pressing `F5`, and then start hacking on the [src/extension.ts](../src/extension.ts) file.

##
<sub>&emsp;_**3.a: Change the message to `Hello Angular`.**_ | Git tag: `lab-3.a`</sub>

For example, let's change the notification message from `Hello World` to `Hello Angular`. Open `src/extension.ts`, locate the `vscode.window.showInformationMessage()` call and change the message. As soon as you change the file, the TypeScript compiler will re-build the extension in the background. To see the change in action, switch to the **Extension Development Host** window, reload the window (via Command Palette > `Reload window`) and invoke the `helloWorld` command again (via Command Palette > `Hello World`).

You should see a notification with the update "Hello Angular" message show up.

##
<sub>&emsp;_**3.b: Add a comma and introduce a bug.**_ | Git tag: `lab-3.b`</sub>

According to [some resources](https://www.grammar-monster.com/lessons/comma_with_dear_hello_and_hi.htm), we should put a comma after "Hello" in a salutation. Let's fix our message to include a comma. One way to achieve that is putting the two words in an array and then use the `.join()` method to join them. (Yes, it is not necessarily the best way, but it is a way :D)

You can see the code I wrote to implement this [on GitHub](https://github.com/gkalpak/my-first-vscode-extension/compare/lab-3.b~1...lab-3.b) or locally by running `git show lab-3.b`. Once you have made the change, try it out by switching to the **Extension Development Host** window, reloading it and running the "Hello World" command.

If you have a keen eye for punctuation errors, you might have noticed that there is an undesired leading comma (before "Hello"). Yay, we have introduced our first VS Code extension bug!

##
<sub>&emsp;_**3: Debug and fix the bug.**_ | Git tag: `lab-3`</sub>

Now that we have a bug in our extension, how do we go about identifying the root cause and fixing it?

Since our message is not what we expect it to be, it sounds like a good idea to put a breakpoint right before the message is shown and inspect the state at that point. In `src/extension.ts`, locate the line containing the `vscode.window.showInformationMessage()` call and [put a breakpoint](https://code.visualstudio.com/docs/editor/debugging#_breakpoints) by clicking on the editor margin (or putting the cursor on that line and pressing `F9`).

Now, switch back to the **Extension Development Host** window and invoke the "Hello World" command again. Once execution reaches the breakpoint, VS Code will stop and focus on the target line in the editor. Here we can inspect the state and step through the code in the built-in debugger. For example, we can hover over the `words` variables and see its current value. Additionally, we can type expressions in the [**Debug Console** REPL](https://code.visualstudio.com/docs/editor/debugging#_debug-console-repl) and have them evaluated in the current execution context. For example, type `words` and then expand the evaluated `Array` value to see the elements in the array.

By observing the value of `words`, we realize that it contains three elements (instead of two) - the first element being `undefined`. This explains the extra comma when joining its elements. Taking a closer look at the code that populates the `words` array, we can see that the indices used are wrong. Changing the indices from `1` and `2` to `0` and `1` (since JavaScript arrays are 0-indexed) should fix the bug.

> ✔️ **Best practice**<br />
> To avoid the overhead of loading unrelated extensions when launching/reloading the **Extension Development Host** window, you can disable them in [.vscode/launch.json](../.vscode/launch.json). Find the "Run Extension" configuration and add `"--disable-extensions"` in the `args` array.

After fixing the code in `src/extension.ts`, save the file, reload the **Extension Development Host** window and invoke the "Hello World" command once more. Unless you have removed the breakpoint, VS Code will again stop execution when the target line is reached. You can hover over the `words` variable and confirm that it now contains the right elements. Hit the "Continue" button in the [Debug Toolbar](https://code.visualstudio.com/docs/editor/debugging#_debug-actions) (or press `F5`) to resume execution. Now back to the **Extension Development Host** window to see the notification show up with the correct message (no extra commas).

(If you haven't done so already, it is now a good time to remove the breakpoint. It has served its purpose for now.)

Good job! That bug is no more 💪

> 💡 **Tip**<br />
> You need to reload the **Extension Development Host** window whenever your extension's code changes (e.g. when you modify a `.ts` file.

**Experiments:**
- Add a breakpoint and step through code (including VS Code internals).
  - Put a breakpoint on the first line of the "Hello World" command callback in `src/extension.ts`.
  - Invoke the command and wait for execution to reach the target line.
  - Step through the code (by clicking the "Step Into" button in the **Debug Toolbar** or pressing `F11`).
  - Step into the `vscode.window.showInformationMessage()` call and take a look around. You are now stepping through actual code of the VS Code application 👩‍💻
  - Remember to remove the breakpoint when done.

- Learn how to disable breakpoints.
  - Put a breakpoint somewhere in `src/extension.ts`.
  - Find out how to disable (but not remove it). Read about breakpoints [here](https://code.visualstudio.com/docs/editor/debugging#_breakpoints).
  - Run the extension and confirm that execution does not stop on disabled breakpoints.

- Learn how to use logpoints.
  - Find out what is a [logpoint](https://code.visualstudio.com/docs/editor/debugging#_logpoints)
  - Put a logpoint in `src/extension.ts` on the line that shows the notification. Make it log something like `Words: ` followed by the actual words in the `words` variable (without hard-coding them in the logpoint).
  - Run the extension, invoke the "Hello World" command and inspect the logpoint output (in the **Debug Console**).

**Resources:**
- [vsc-extension-quickstart.md](../vsc-extension-quickstart.md):<br />
  _A basic overview of the extension, quick instructions on how to run and test it and ideas for next steps._

- [VS Code: Extensions capabilities overview](https://code.visualstudio.com/api/extension-capabilities/overview):<br />
  _An overview of the different categories of extensions and the capabilities available to each._

- [VS Code: Common capabilities](https://code.visualstudio.com/api/extension-capabilities/common-capabilities):<br />
  _An overview of common extension capabilities, available to all types of extensions._

- [VS Code: Debugging](https://code.visualstudio.com/docs/editor/debugging):<br />
  _All you need to know to get started with debugging your code in VS Code._

<p align="right"><sub><a href="#top">Back to top</a></sub></p>


<a name="lab-4"></a>
### Lab 4

**Objective:** Implement feature: Show Angular template on hover.<br />
**Code diff:** https://github.com/gkalpak/my-first-vscode-extension/compare/lab-3...lab-4<br />
**Git tag:** `lab-4`

**Notes:**<br />
Hopefully, you now have a solid grasp on how to modify, preview and debug the extension. It is time to start working on the actual functionality. Since we are at an Angular conference, let's build something that will make our lives easier when working on Angular projects.

In particular, we will focus on working with components, which are the heart and soul of an Angular application. As you may know, all components have a template, which is specified in the [`@Component` metadata](https://angular.io/guide/architecture-components#component-metadata). The template can be defined either inline (using the `template` property) or as relative path to an external HTML file (using the `templateUrl` property). Both options have pros and cons:
- Using an inline template makes it easy to see and edit the template alongside the component logic, but one loses HTML intellisense features (such as auto-complete, code high-lighting, etc.).
- Using an HTML file offers a better HTML editing experience, but one needs to do extra work to get from the component file to the template file and vice versa.

One way to improve the situation is to show the contents of the HTML template file in a popup when hovering over the template URL. This way we can have a good HTML editing experience (by keeping the templates in separate HTML files), but still be able to look at the template content without leaving the component file. Still not ideal, but an improvement for sure!

> **NOTE:**<br />
> There are already extensions available on the VS Code Marketplace that provide similar features (and more). They are also a good resource if you are looking for ideas to enrich your extension's functionality:
> - [angular2-switcher](https://marketplace.visualstudio.com/items?itemName=infinity1207.angular2-switcher)
> - [Angular Follow Selector](https://marketplace.visualstudio.com/items?itemName=sanderledegen.angular-follow-selector)

##
<sub>&emsp;_**4.a: Create a fixture.**_ | Git tag: `lab-4.a`</sub>

Before starting to implement the new functionality, we need a component to try it on. If you have an Angular project around, you can use that. However, it makes things a little simpler (and more predictable) if we create a dummy component (a fixture) inside the extension project.

> ✔️ **Best practice**<br />
> By using fixtures, you get several benefits:
> - It creates a more consistent dev environment for other people that want to contibute to your extension.
> - You can easily reproduce any condition you need to try the extension on.
> - You can use the same fixtures in tests (as we will see later), which may run in a different environment (e.g. on a Continuous Integration platform) and not have access to your local projects.

First, create a `fixtures/simple-component/` directory. Then, create basic Angular component. At the very least, you need to have a `*.component.ts` and a `*.component.html` file. You can see the code I used [on GitHub](https://github.com/gkalpak/my-first-vscode-extension/compare/lab-4.a~1...lab-4.a) or locally by running `git show lab-4.a`.

The fixtures are not part of the extension's code, so we do not want them to be compiled or published along with it. To prevent that from happening, to update [tsconfig.json](../tsconfig.json) and [.vscodeignore](../.vscodeignore) accordingly.

Now, when we launch the **Extension Development Host** window, we can click `File` > `Open Folder` (in the top menu) and select the `fixtures/simple-component/` directory. Once we implement more features, we can use our simple component to try out the extension.

> 💡 **Tip**<br />
> If you VS Code to automatically load a specific directory when launching the **Extension Development Host** window, you can configure it in [.vscode/launch.json](../.vscode/launch.json). Find the "Run Extension" configuration and add the directory path (e.g. `"${workspaceFolder}/fixtures/simple-component/"`) in the `args` array.

##
<sub>&emsp;_**4.b: Implement a no-op `HoverProvider`.**_ | Git tag: `lab-4.b`</sub>

In order for an extension to provide popups on hover, it needs to implement a [HoverProvider](https://code.visualstudio.com/api/references/vscode-api#HoverProvider) and [register it](https://code.visualstudio.com/api/references/vscode-api#languages.registerHoverProvider).

We will begin by creating a new `template-url-intellisense-provider.ts` file under `src/` and add a simple class that implements the `HoverProvider` interface. All we need is a `provideHover()` method that receives a document and a position and returns either a [Hover](https://code.visualstudio.com/api/references/vscode-api#Hover) instance (if there is info to show for that position) or `null`/`undefined` otherwise. We will always return a `Hover` containing "Not implemented" for now.

> 💡 **Tip**<br />
> You can see the code for this step [on GitHub](https://github.com/gkalpak/my-first-vscode-extension/compare/lab-4.b~1...lab-4.b) or locally by running `git show lab-4.b`.

Now that we have a basic `HoverProvider`, we need to register it with VS Code. Inside the `activate()` function in `src/extension.ts`, we need to create an instance of the `TemplateUrlIntellisenseProvider` class and pass it to `vscode.languages.registerHoverProvider()`. We also need to specify a [DocumentSelector](https://code.visualstudio.com/api/references/vscode-api#DocumentSelector) to limit the type of files our provider applies to. This allows VS Code to save unnecessary work on other files. For our needs, it suffices to limit the provider to TypeScript files with a `.component.ts` extension. Look at the code (either on GitHub or locally, as described above) for more details.

Last but not least, we need to let VS Code know that our extension needs to be activated when a TypeScript file is opened. Up until now, our extension would only be activated when invoking the "Hello World" command. Open [package.json](../package.json) and add `"onLanguage:typescript"` in the `activationEvents` array.

With all bits in place, you can now switch to the **Extension Development Host** window (reload if necessary) and preview the hover functionality by opening a `.component.ts` file and trying to hover over anything. (You should see a little `Not implemented` popup.)

##
<sub>&emsp;_**4: Implement the actual `HoverProvider` logic.**_ | Git tag: `lab-4`</sub>

Finally, we shall implement the actual `HoverProvider` logic necessary to show template content on hover. You can look at the code for details ([on GitHub](https://github.com/gkalpak/my-first-vscode-extension/compare/lab-4~1...lab-4) or locally with `git show lab-4`), but in a nutshell here is how it goes:
1. Get the text of the line being hovered.
2. Check whether the line is a `templateUrl` line and extract the template URL (relative path).
3. Resolve the path to the template HTML file and read the HTML content.
4. Return a `Hover` with the content of the component template (formatted as HTML).

This is not a bullet-proof algorithm, but it works for our purposes. Most of it is also not specific to VS Code extensions or Angular (extracting some useful information from some test, resolving file names, reading file contents, etc.).

Again, reload the **Extension Development Host** window and see the new functionality in action.
(Note that the template content is nicely formatted as HTML.)

<!--
INSTRUCTOR NOTES:
Show how to figure out the `language: 'html'` part via typings.
-->

Amazing! We can now look at the HTML template without leaving the component file 🎉

**Experiments:**
- Implement the same functionality for `styleUrls`.
  - Modify `TemplateUrlIntellisenseProvider#provideHover()` to also look for `styleUrls` lines. To keep things simple, only recognize lines that look like this: `styleUrls: ['./path/to/styles'],`
  - If a `styleUrls` line is found, extract the relative path to the styles file, resolve it to an absolute file path, read its contents and return a `Hover`.
  - Ensure the code in the `Hover` is correctly styled as CSS/Sass.

- Provide the second, optional argument to `Hover`: a `Range`.
  - Notice that when you move the cursor from `.component.` to `.html` while a popup is shown, the popup will momentarily disappear and reappear. This is because (by default) VS Code scopes each provided `Hover` to the current word.
  - Use intellisense (e.g. `Right click` > `Go to Type Definition` on the `Hover` class) to discover the second, optional [Range](https://code.visualstudio.com/api/references/vscode-api#Range).
  - Provide the second argument to let VS Code know that the provided `Hover` applies to the whole template URL string.

- Modify `TemplateUrlIntellisenseProvider#provideHover()` to use [vscode.workspace.fs](https://code.visualstudio.com/api/references/vscode-api#workspace), a [FileSystem](https://code.visualstudio.com/api/references/vscode-api#FileSystem) that allows access to files from contributed file systems, such as the [SSH or WSL remote file systems](https://code.visualstudio.com/docs/remote/remote-overview). See [here](https://code.visualstudio.com/updates/v1_37#_vscodeworkspacefs) for more details.
  - Modify the `TemplateUrlIntellisenseProvider#provideHover()` method to be asynchronous (e.g. replace the synchronous [Node.js `fs`](https://nodejs.org/api/fs.html) methods with their asynchronous counterparts).
  - Find out what is the third argument passed to `HoverProvider#provideHover()` method and use it.
    (Tip: You can use intellisense to discover it via the provided typings.)
  - Switch to [vscode.workspace.fs](https://code.visualstudio.com/api/references/vscode-api#workspace).
    (Note, this is not a drop-in replacement.)

**Resources:**
- [VS Code API: HoverProvider](https://code.visualstudio.com/api/references/vscode-api#HoverProvider).

- [VS Code API: languages.registerHoverProvider()](https://code.visualstudio.com/api/references/vscode-api#languages.registerHoverProvider).

- [VS Code API: activation-events#onLanguage](https://code.visualstudio.com/api/references/activation-events#onLanguage).

<p align="right"><sub><a href="#top">Back to top</a></sub></p>


<a name="lab-5"></a>
### Lab 5

**Objective:** Implement feature: Peek/Go to Angular template definition.<br />
**Code diff:** https://github.com/gkalpak/my-first-vscode-extension/compare/lab-4...lab-5<br />
**Git tag:** `lab-5`

**Notes:**<br />
Being able to see the template from the component file is great, but it still leaves a lot to be desired. For example, there is still no easy way to make a quick edit without leaving the component file. Let's address that by providing a definition for the template URL, which points to the actual HTML file. This way, we will be able to take advantage of VS Code's capabilities and either [peek the template content inline](https://code.visualstudio.com/docs/editor/editingevolved#_peek) or [go straight to the template file](https://code.visualstudio.com/docs/editor/editingevolved#_go-to-definition). These two functionalities can be invoked by right-clicking on the template URL and choosing `Peek Definition` or `Go to Definition` respectively.

##
<sub>&emsp;_**5.a: Implement a no-op `DefinitionProvider`.**_ | Git tag: `lab-5.a`</sub>

In order for an extension to provide definitions, it needs to implement a [DefinitionProvider](https://code.visualstudio.com/api/references/vscode-api#DefinitionProvider) and [register it](https://code.visualstudio.com/api/references/vscode-api#languages.registerDefinitionProvider).

Similar to what we did with the `HoverProvider` in the previous lab, we are first going to provide a no-op `DefinitionProvider`. Since much of the `provideDefinition()` logic will be common with the `provideHover()` logic (e.g. extracting the relative path, resolving the file path, etc.), we will expand the `TemplateUrlIntellisenseProvider` (which quite conveniently has a generic name 😉) to also implement the `DefinitionProvider` interface. All we need is a `provideDefinition()` method that receives a document and a position and returns either a [Definition](https://code.visualstudio.com/api/references/vscode-api#Definition) instance or `null`/`undefined` if it can't provide a definition for the target symbol. We will always return `null` for now.

> 💡 **Tip**<br />
> You can see the code for this step [on GitHub](https://github.com/gkalpak/my-first-vscode-extension/compare/lab-5.a~1...lab-5.a) or locally by running `git show lab-5.a`.

Now that we have a basic `DefinitionProvider`, we need to register it with VS Code. Inside the `activate()` function in `src/extension.ts`, we need to pass an instance of the `TemplateUrlIntellisenseProvider` class to `vscode.languages.registerDefinitionProvider()`. Since we already have an instance of this class (uses as a `HoverProvider`), we can reuse it. We will also reuse the `DocumentSelector` we use in `registerHoverProvider()`, since both providers target the same types of files.

Normally, we would also need to add `"onLanguage:typescript"` to `activationEvents` array in `package.json`. Notice, however, that we don't have to do anything, because we already did that when adding the `HoverProvider` in the previous lab.

##
<sub>&emsp;_**5: Implement the actual `DefinitionProvider` logic.**_ | Git tag: `lab-5`</sub>

We shall, now, implement the actual `DefinitionProvider` logic necessary for the `Peek/Go to Definition` features to work. You can look at the code for details ([on GitHub](https://github.com/gkalpak/my-first-vscode-extension/compare/lab-5~1...lab-5) or locally with `git show lab-5`), but in a nutshell here is how it goes:
1. Refactor the common logic for extracting the template file path to a `getTemplateFilePath()` method.
2. USe that method in `provideDefinitionProvider()` to get the template file path.
3. Provide a `Definition`, which is basically a [Location](https://code.visualstudio.com/api/references/vscode-api#Location) object pointing to the URI of the template file and a `Range` spanning the whole file (since the whole file consitutes the definition of the template URL).

Finally, you can reload the **Extension Development Host** window and see the new functionality in action. Right-click on the template URL and try both `Peek Definition` and `Go to Definition`

**Experiments:**
- Implement the same functionality for `styleUrls`.
  - Modify `TemplateUrlIntellisenseProvider#provideDefinition()` to also look for `styleUrls` lines. To keep things simple, only recognize lines that look like this: `styleUrls: ['./path/to/styles'],`
  - If a `styleUrls` line is found, extract the relative path to the styles file, resolve it to an absolute file path, and return a `Definition`.
  - Try it out in the **Extension Development Host** window.

**Resources:**
- [VS Code API: DefinitionProvider](https://code.visualstudio.com/api/references/vscode-api#DefinitionProvider).

- [VS Code API: languages#registerDefinitionProvider()](https://code.visualstudio.com/api/references/vscode-api#languages.registerDefinitionProvider).

<p align="right"><sub><a href="#top">Back to top</a></sub></p>


<a name="lab-6"></a>
### Lab 6

**Objective:** End-to-end (E2E) testing.<br />
**Code diff:** https://github.com/gkalpak/my-first-vscode-extension/compare/lab-5...lab-6<br />
**Git tag:** `lab-6`

**Notes:**<br />
Visual Studio Code supports running and debugging tests for your extension. These tests will run inside a special instance of VS Code named the Extension Development Host, and have full access to the VS Code API. We refer to these tests as integration tests, because they go beyond unit tests that can run without a VS Code instance. This documentation focuses on VS Code integration tests.


Integration tests - Require an actual VS Code instance - Run in **Extension Developement Host** window.
Slower but more accurate env (as is true for all e2e tests).

Already scaffolded.
Go to Debug View and run e2e tests.
See output in DEBUG CONSOLE.

Look at files in `src/test/` in more detail.
  - `runTest.ts` calls the `runTests()` helper from `vscode-test`.
  - Scripts under `suite/` are executed on the **Extension Development Host** window.
  - `suite/index.ts` exports `run()` function.

There is `npm test` script.
Mention limitation: https://code.visualstudio.com/api/working-with-extensions/testing-extension#using-insiders-version-for-extension-development
Runs with no open editors (or different version, e.g. insiders).

<!-- 6.a -->
Tests scaffolded with Mocha - we'll use that.
Minor tweaks/tips:
  - Open our fixture `fixtures/simple-component/` in test instance.
  - Add `--disable-extensions`.
  - Rename `src/test/suite/` to `src/test/e2e/` (to more easily distinguish from `src/test/unit/` later).
Run tests - See output in DEBUG CONSOLE.

<!-- 6.b -->
<!-- Consider skipping during workshop. Maybe only mention it is there and they should look at it themselves later. -->
Update `runTests.ts` to run on min-supported version.
This way you can run from the command-line, even with open editor (takes time the first time, as it has to donwload the VS Code binaries).

TIP: On CI, it is a good idea to run on both the latest VS Code version and minimum supported one, to ensure that the extension is compatible with all supported versions.

<!-- 6.c -->
Install sinon (`npm install --save-dev sinon @types/sinon`).
Add tests for command `extension.helloWorld` and `HoverProvider`.
Error in assertion for returned `Hover`.

<!-- 6 -->
Put break-point in `TemplateUrlIntellisenseProvider#provideHover()`. And find out that the position was wrong.

**Experiments:** -

**Resources:**
- [](https://code.visualstudio.com/api/working-with-extensions/testing-extension):<br />
  __

- [](https://mochajs.org/):<br />
  __

- [](https://github.com/microsoft/vscode-test#usage):<br />
  __

- [](https://code.visualstudio.com/api/references/commands):<br />
  __

<p align="right"><sub><a href="#top">Back to top</a></sub></p>


<a name="lab-7"></a>
### Lab 7

**Objective:** Unit testing.<br />
**Code diff:** https://github.com/gkalpak/my-first-vscode-extension/compare/lab-6...lab-7<br />
**Git tag:** `lab-7`

**Notes:**<br />
Unit tests - Do not have access to an actual VS Code instance - Require mocking `vscode` APIs.
Faster - Suitable for running during dev.

<!-- 7.a -->
Create a `src/test/unit/index.ts` file with a Mocha runner. (Modify `test/*/index.ts` to only match `__dirname`.)
Create a `src/test/unit/extension.test.ts` file with a failing test.
Add a script for unit tests in `package.json`.
Run unit tests with `npm run test-unit` (they should fail).

<!-- 7.b -->
We would like to add a test for `extension.ts > activate()`, but it relies on `vscode` APIs (which are not available during tests). We have to mock them.
`npm install --save-dev mock-require @types/mock-require`
Mock `vscode` in `src/test/unit/index.ts`.

<!-- 7.c -->
Add actual test for `extension.ts`.
Add `watch` and `test-unit-watch` script in `package.json`.
Run default task + `test-unit-watch`.

<!-- 7 -->
Add some more tests for `extension.ts`.

Experiments:
  - Add unit tests for `registerDefinition/HoverProvider()`.
  - Add unit tests for `TemplateUrlIntellisenseProvider`.
    1. Add `vscode` mocks for the necessary APIs.
    2. Add the tests.

**Experiments:** -

**Resources:**
- [](https://www.npmjs.com/package/mock-require):<br />
  __

<p align="right"><sub><a href="#top">Back to top</a></sub></p>


<a name="lab-8"></a>
### Lab 8

**Objective:** Package and share the extension.<br />
**Code diff:** https://github.com/gkalpak/my-first-vscode-extension/compare/lab-7...lab-8<br />
**Git tag:** `lab-8`

**Notes:**<br />
...
  - Mention how to install/uninstall and manage extensions from inside VS Code.
  - Notes/Questions:
    - Use webpack? (Maybe just reference the Bundling guide.)

**Experiments:** -

**Resources:**
- [](https://code.visualstudio.com/api/working-with-extensions/publishing-extension):<br />
  __

?- [](https://code.visualstudio.com/api/working-with-extensions/continuous-integration):<br />
  __

?- [](https://code.visualstudio.com/api/working-with-extensions/bundling-extension):<br />
  __

<p align="right"><sub><a href="#top">Back to top</a></sub></p>


<!--
Potential labs (or topics without lab):
- Setting up CI (https://code.visualstudio.com/api/working-with-extensions/continuous-integration).
  - Use `Xvfb` or similar.
  - Run e2e tests against multiple versions.
  - Auto-release and/or publish (e.g. on tags).
- Running tests with jasmine (https://github.com/gkalpak/aio-docs-utils).
- Script for running on multiple versions (and remove obsolete - for CI).
-->

<!--
Resources:

> 💡 **Tip**<br />
> Do this and that.

> ✔️ **Best practice**<br />
> Do this and that.

-->




[git]: https://git-scm.com/
[git-download]: https://git-scm.com/downloads
[jasmine]: https://jasmine.github.io/
[mocha]: https://mochajs.org/
[node]: https://nodejs.org/
[node-download]: https://nodejs.org/en/download
[repository]: https://github.com/gkalpak/my-first-vscode-extension
[tslint]: https://palantir.github.io/tslint
[tslint-extension]: https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin
[typescript]: https://www.typescriptlang.org/
[vscode]: https://code.visualstudio.com/
[vscode-download]: https://code.visualstudio.com/download
[yeoman]: https://yeoman.io/
[yeoman-code]: https://www.npmjs.com/package/generator-code
