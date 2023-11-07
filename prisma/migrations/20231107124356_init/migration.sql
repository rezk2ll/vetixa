-- CreateTable
CREATE TABLE "Diagnostic" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
