/*
  Warnings:

  - Made the column `content` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `authorId` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `category` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `passwordHash` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "content" SET NOT NULL,
ALTER COLUMN "authorId" SET NOT NULL,
ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "category" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "passwordHash" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
