-- CreateTable
CREATE TABLE "Client" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "tel" TEXT
);

-- CreateTable
CREATE TABLE "Animal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "weight" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Fiche" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "motif" TEXT NOT NULL,
    "date_admission" TEXT NOT NULL,
    "pronostic" TEXT NOT NULL,
    "date_sortie" TEXT NOT NULL,
    "clientId" INTEGER NOT NULL,
    "animalId" INTEGER NOT NULL,
    CONSTRAINT "Fiche_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Fiche_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
