-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "uf" TEXT,
    "phone" TEXT NOT NULL,
    "cnpj" TEXT,
    "name" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "confirmPend" BOOLEAN NOT NULL DEFAULT true,
    "iv" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    "deletedBy" INTEGER
);
INSERT INTO "new_user" ("cnpj", "confirmPend", "createdAt", "deletedAt", "deletedBy", "email", "id", "iv", "login", "name", "password", "phone", "role", "uf", "updatedAt") SELECT "cnpj", "confirmPend", "createdAt", "deletedAt", "deletedBy", "email", "id", "iv", "login", "name", "password", "phone", "role", "uf", "updatedAt" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
CREATE UNIQUE INDEX "user_phone_key" ON "user"("phone");
CREATE UNIQUE INDEX "user_login_key" ON "user"("login");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
