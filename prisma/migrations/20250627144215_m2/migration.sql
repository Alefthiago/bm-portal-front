-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_navSub" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "icon" TEXT,
    "navMainId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    CONSTRAINT "navSub_navMainId_fkey" FOREIGN KEY ("navMainId") REFERENCES "navMain" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_navSub" ("createdAt", "deletedAt", "icon", "id", "navMainId", "title", "updatedAt") SELECT "createdAt", "deletedAt", "icon", "id", "navMainId", "title", "updatedAt" FROM "navSub";
DROP TABLE "navSub";
ALTER TABLE "new_navSub" RENAME TO "navSub";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
