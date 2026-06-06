CREATE INDEX "Dish_status_archivedAt_dishType_createdAt_idx"
ON "Dish"("status", "archivedAt", "dishType", "createdAt");

CREATE INDEX "Dish_createdById_archivedAt_idx"
ON "Dish"("createdById", "archivedAt");

CREATE INDEX "DishHistory_userId_clickIdx_idx"
ON "DishHistory"("userId", "clickIdx");

CREATE INDEX "DishHistory_dishId_shownAt_idx"
ON "DishHistory"("dishId", "shownAt");
