/*
  Warnings:

  - Added the required column `userId` to the `OpeningHours` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `OpeningHours` ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `OpeningHours` ADD CONSTRAINT `OpeningHours_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
