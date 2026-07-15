const required = [20, 19, 4];
const current = process.versions.node.split('.').map(Number);

let comparison = 0;
for (let index = 0; index < required.length; index += 1) {
  if (current[index] === required[index]) continue;
  comparison = current[index] > required[index] ? 1 : -1;
  break;
}
const isSupported = comparison >= 0;

if (!isSupported) {
  console.error(
    `Unsupported Node.js ${process.versions.node}. RandoMeal requires >=${required.join('.')}. ` +
      'Run your Node version manager in the repository root (for example: nvm use).',
  );
  process.exit(1);
}

console.log(`Node.js ${process.versions.node} satisfies the RandoMeal runtime requirement.`);
