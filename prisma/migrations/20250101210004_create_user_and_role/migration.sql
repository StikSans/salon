/*
  Warnings:

  - You are about to alter the column `sex` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `sex` ENUM('MALE', 'FEMALE', 'OTHER') NOT NULL DEFAULT 'OTHER';
