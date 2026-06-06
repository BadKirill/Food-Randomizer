/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const args = process.argv.slice(2);
  const email = args.find((arg) => !arg.startsWith('--'));
  const dryRun = args.includes('--dry-run');

  if (!email) {
    throw new Error('Usage: npm run prisma:assign-legacy-owner -- <owner-email> [--dry-run]');
  }

  const owner = await prisma.user.findUnique({ where: { email: email.trim().toLowerCase() } });
  if (!owner) {
    throw new Error(`No user found for ${email}`);
  }

  const legacyCount = await prisma.dish.count({ where: { createdById: null } });
  console.log(`${dryRun ? '[dry-run] ' : ''}Found ${legacyCount} legacy dishes without an owner.`);

  if (dryRun || legacyCount === 0) return;

  const result = await prisma.dish.updateMany({
    where: { createdById: null },
    data: {
      createdById: owner.id,
      createdBy: owner.email ?? owner.id,
    },
  });

  console.log(`Assigned ${result.count} legacy dishes to ${owner.email ?? owner.id}.`);
}

main()
  .catch((error) => {
    console.error(error.message ?? error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
