-- CreateEnum
CREATE TYPE "Categories" AS ENUM ('ART', 'GAMING', 'MUSIC', 'PHOTOGRAPHY', 'VIDEO', 'SPORT');

-- AlterTable
ALTER TABLE "NFT" ADD COLUMN     "tags" "Categories"[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatarPicture" TEXT,
ADD COLUMN     "bannerPicture" TEXT;
