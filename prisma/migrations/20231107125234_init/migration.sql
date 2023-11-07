-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Diagnostic" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" TEXT NOT NULL,
    "ficheId" INTEGER NOT NULL,
    "time" TEXT NOT NULL,
    "alimentation" TEXT NOT NULL,
    "abreuvement" TEXT NOT NULL,
    "urines" TEXT NOT NULL,
    "vaumissement" TEXT NOT NULL,
    "bilan" TEXT NOT NULL,
    "traitement" TEXT NOT NULL,
    "anti" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    CONSTRAINT "Diagnostic_ficheId_fkey" FOREIGN KEY ("ficheId") REFERENCES "Fiche" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Diagnostic" ("abreuvement", "alimentation", "anti", "bilan", "date", "ficheId", "id", "state", "time", "traitement", "urines", "vaumissement") SELECT "abreuvement", "alimentation", "anti", "bilan", "date", "ficheId", "id", "state", "time", "traitement", "urines", "vaumissement" FROM "Diagnostic";
DROP TABLE "Diagnostic";
ALTER TABLE "new_Diagnostic" RENAME TO "Diagnostic";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
