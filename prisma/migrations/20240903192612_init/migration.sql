/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Emploee` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Emploee_name_key" ON "Emploee"("name");
