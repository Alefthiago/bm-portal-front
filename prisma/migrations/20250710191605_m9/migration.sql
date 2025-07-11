/*
  Warnings:

  - You are about to drop the column `cnpj` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `confirmPend` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `user` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "accessLevel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uf" TEXT,
    "phone" TEXT,
    "name" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "iv" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'employee',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    "deletedBy" INTEGER
);
INSERT INTO "new_user" ("createdAt", "deletedAt", "deletedBy", "id", "iv", "login", "name", "password", "phone", "role", "uf", "updatedAt") SELECT "createdAt", "deletedAt", "deletedBy", "id", "iv", "login", "name", "password", "phone", "role", "uf", "updatedAt" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_phone_key" ON "user"("phone");
CREATE UNIQUE INDEX "user_login_key" ON "user"("login");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "accessLevel_name_key" ON "accessLevel"("name");
