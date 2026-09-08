/*
  Warnings:

  - The values [CONVERTED,ARCHIVED] on the enum `LeadStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- AlterEnum
BEGIN;
CREATE TYPE "LeadStatus_new" AS ENUM ('NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL_SENT', 'NEGOTIATING', 'WON', 'LOST');
ALTER TABLE "public"."Lead" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Lead" ALTER COLUMN "status" TYPE "LeadStatus_new" USING (
  CASE "status"::text
  WHEN 'CONVERTED' THEN 'WON'
  WHEN 'ARCHIVED' THEN 'LOST'
  ELSE "status"::text
END
  ::"LeadStatus_new"
);
ALTER TYPE "LeadStatus" RENAME TO "LeadStatus_old";
ALTER TYPE "LeadStatus_new" RENAME TO "LeadStatus";
DROP TYPE "public"."LeadStatus_old";
ALTER TABLE "Lead" ALTER COLUMN "status" SET DEFAULT 'NEW';
COMMIT;

-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "assignedToId" INTEGER,
ADD COLUMN     "estimatedValue" DOUBLE PRECISION,
ADD COLUMN     "followUpDate" TIMESTAMP(3),
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "priority" "Priority" NOT NULL DEFAULT 'MEDIUM',
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- CreateIndex
CREATE INDEX "Lead_assignedToId_idx" ON "Lead"("assignedToId");

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
