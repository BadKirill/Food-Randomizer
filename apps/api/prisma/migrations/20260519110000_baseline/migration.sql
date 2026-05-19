-- CreateEnum
CREATE TYPE "DishSource" AS ENUM ('manual', 'ai', 'vision');

-- CreateEnum
CREATE TYPE "DishStatus" AS ENUM ('pending_approval', 'approved', 'rejected');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dish" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "source" "DishSource" NOT NULL DEFAULT 'manual',
    "status" "DishStatus" NOT NULL DEFAULT 'approved',
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dish_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DishIngredient" (
    "id" TEXT NOT NULL,
    "dishId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount" TEXT,
    "unit" TEXT,
    "optional" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DishIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DishStep" (
    "id" TEXT NOT NULL,
    "dishId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DishStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DishAddOptionGroup" (
    "id" TEXT NOT NULL,
    "dishId" TEXT NOT NULL,
    "groupKey" TEXT NOT NULL,
    "label" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DishAddOptionGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DishAddOption" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DishAddOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DishHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "dishId" TEXT NOT NULL,
    "clickIdx" INTEGER NOT NULL,
    "shownAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DishHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiGeneration" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "operation" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "prompt" TEXT,
    "rawResponse" TEXT,
    "parsedPayload" JSONB,
    "confidence" DOUBLE PRECISION,
    "status" TEXT NOT NULL,
    "errorMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AiGeneration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DishImage" (
    "id" TEXT NOT NULL,
    "dishId" TEXT,
    "imageUrl" TEXT NOT NULL,
    "visionPayload" JSONB,
    "confidence" DOUBLE PRECISION,
    "recognizedName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DishImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DishStep_dishId_position_key" ON "DishStep"("dishId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "DishAddOptionGroup_dishId_groupKey_key" ON "DishAddOptionGroup"("dishId", "groupKey");

-- CreateIndex
CREATE INDEX "DishHistory_userId_shownAt_idx" ON "DishHistory"("userId", "shownAt");

-- AddForeignKey
ALTER TABLE "Dish" ADD CONSTRAINT "Dish_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DishIngredient" ADD CONSTRAINT "DishIngredient_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DishStep" ADD CONSTRAINT "DishStep_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DishAddOptionGroup" ADD CONSTRAINT "DishAddOptionGroup_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DishAddOption" ADD CONSTRAINT "DishAddOption_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "DishAddOptionGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DishHistory" ADD CONSTRAINT "DishHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DishHistory" ADD CONSTRAINT "DishHistory_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DishImage" ADD CONSTRAINT "DishImage_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE SET NULL ON UPDATE CASCADE;

