// Imports
const {execSync} = require('child_process');
const {createInterface} = require('readline');
const exec = cmd => execSync(cmd, {encoding: 'utf8'}).trim();

// Run
_main();

// Helpers
async function _main() {
  // Delete existing `lab-*` tags.
  const tags = toLines(exec('git tag --list lab-*'));
  tags.forEach(tag => {
    console.log(`Deleting tag '${tag}'...`);
    exec(`git tag --delete ${tag}`);
  });

  console.log('');

  // Find and tag "taggable" commits.
  const commits = toLines(exec('git log --oneline')).filter(line => / \[lab-\d+(?:\.[a-z])?] /.test(line));
  const shaTagPairs = commits.map(commit => /^(\S+) \[([^\]]+)] /.exec(commit).slice(1, 3));
  shaTagPairs.push([`${shaTagPairs[shaTagPairs.length - 1][0]}~1`, 'lab-0']);
  shaTagPairs.forEach(([sha, tag]) => {
    console.log(`Creating tag '${tag}' at SHA ${sha}...`);
    exec(`git tag ${tag} ${sha}`);
  });

  console.log('');

  // Prompt updating origin.
  const forcePush = await confirm('Force-push updated tags to origin?');
  const updateCmds = [
    'git push --force-with-lease origin',
    'git push --force --tags origin',
  ];

  if (forcePush) {
    // Force-push to update origin.
    console.log('Force-pushing to origin...\n');
    updateCmds.forEach(cmd => {
      console.log(`Running: ${cmd}`);
      exec(cmd);
    });
  } else {
    // Remind the user to manually update origin.
    console.log(`Do not forget to update origin with:\n\n${updateCmds.join('\n')}\n`);
  }
}

function confirm(question) {
  return new Promise(resolve => {
    const rl = createInterface({input: process.stdin, output: process.stdout});
    rl.question(`${question} [y/N]: `, answer => {
      const confirmed = ['y', 'yes'].includes(answer.toLowerCase());
      rl.close();
      console.log('');
      resolve(confirmed);
    });
  });
}

function toLines(input) {
  return input.split('\n').filter(Boolean);
}
