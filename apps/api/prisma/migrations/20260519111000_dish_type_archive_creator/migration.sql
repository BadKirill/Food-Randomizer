-- CreateEnum
CREATE TYPE "DishType" AS ENUM ('usual', 'vegetarian', 'vegan');

-- AlterTable
ALTER TABLE "Dish" ADD COLUMN     "archivedAt" TIMESTAMP(3),
ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "dishType" "DishType" NOT NULL DEFAULT 'usual';

