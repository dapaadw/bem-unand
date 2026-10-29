PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Profile" (
 "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, "title" TEXT NOT NULL DEFAULT '',
 "subtitle" TEXT NOT NULL DEFAULT '', "heroImageUrl" TEXT, "heroImageAlt" TEXT,
 "videoUrl" TEXT, "backgroundColor" TEXT, "ctaText" TEXT, "ctaLink" TEXT,
 "visiMisi" TEXT, "logoPhilosophy" TEXT,
 "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Profile" SELECT "id", "title", "subtitle", "heroImageUrl", "heroImageAlt", "videoUrl", "backgroundColor", "ctaText", "ctaLink", "visiMisi", "logoPhilosophy", "updatedAt", "updatedAt" FROM "Profile";
DROP TABLE "Profile";
ALTER TABLE "new_Profile" RENAME TO "Profile";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
