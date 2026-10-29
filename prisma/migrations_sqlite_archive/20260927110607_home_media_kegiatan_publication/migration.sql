-- AlterTable
ALTER TABLE "Profile" ADD COLUMN "videoUrl" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Kegiatan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "time" TEXT,
    "publishedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "location" TEXT NOT NULL,
    "organizer" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "publicationUrl" TEXT,
    "registrationUrl" TEXT,
    "createdBy" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Kegiatan" ("publishedAt", "createdAt", "createdBy", "date", "description", "id", "location", "name", "organizer", "publicationUrl", "registrationUrl", "slug", "type", "updatedAt") SELECT "createdAt", "createdAt", "createdBy", "date", "description", "id", "location", "name", "organizer", "publicationUrl", "registrationUrl", "slug", "type", "updatedAt" FROM "Kegiatan";
DROP TABLE "Kegiatan";
ALTER TABLE "new_Kegiatan" RENAME TO "Kegiatan";
CREATE UNIQUE INDEX "Kegiatan_slug_key" ON "Kegiatan"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
