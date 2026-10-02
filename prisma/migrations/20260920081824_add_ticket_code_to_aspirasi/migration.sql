/*
  Warnings:

  - Added the required column `ticketCode` to the `Aspirasi` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Aspirasi" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ticketCode" TEXT NOT NULL,
    "nama" TEXT,
    "nim" TEXT,
    "cp" TEXT,
    "email" TEXT,
    "pihakDituju" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "buktiUrl" TEXT,
    "harapan" TEXT,
    "status" TEXT NOT NULL DEFAULT 'BARU',
    "isAnonymous" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Aspirasi" ("buktiUrl", "cp", "createdAt", "deskripsi", "email", "harapan", "id", "isAnonymous", "nama", "nim", "pihakDituju", "status") SELECT "buktiUrl", "cp", "createdAt", "deskripsi", "email", "harapan", "id", "isAnonymous", "nama", "nim", "pihakDituju", "status" FROM "Aspirasi";
DROP TABLE "Aspirasi";
ALTER TABLE "new_Aspirasi" RENAME TO "Aspirasi";
CREATE UNIQUE INDEX "Aspirasi_ticketCode_key" ON "Aspirasi"("ticketCode");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
