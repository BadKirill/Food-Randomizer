-- Backfill existing dishes as vegan per product decision.
UPDATE "Dish"
SET "dishType" = 'vegan'
WHERE "archivedAt" IS NULL
  AND "dishType" = 'usual';
