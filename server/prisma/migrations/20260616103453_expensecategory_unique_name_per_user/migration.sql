/*
  Warnings:

  - A unique constraint covering the columns `[name,userId]` on the table `ExpenseCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ExpenseCategory_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "ExpenseCategory_name_userId_key" ON "ExpenseCategory"("name", "userId");
