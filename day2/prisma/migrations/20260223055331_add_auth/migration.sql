/*
  Warnings:

  - You are about to drop the column `profileImage` on the `User` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Intern" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Intern_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Task" (
    "ide" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "attachment" TEXT,
    "internId" INTEGER NOT NULL,
    CONSTRAINT "Task_internId_fkey" FOREIGN KEY ("internId") REFERENCES "Intern" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'intern'
);
INSERT INTO "new_User" ("email", "id", "name", "password", "role") SELECT "email", "id", "name", "password", "role" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
