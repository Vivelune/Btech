/*
  Warnings:

  - The values [PROPOSAL_SENT,NEGOTIATING,WON] on the enum `LeadStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LeadStatus_new" AS ENUM ('NEW', 'CONTACTED', 'REPLIED', 'INTERESTED', 'MEETING_BOOKED', 'QUALIFIED', 'CONVERTED', 'LOST');
ALTER TABLE "public"."Lead" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Lead" ALTER COLUMN "status" TYPE "LeadStatus_new" USING (
  CASE "status"::text
    WHEN 'QUALIFIED' THEN 'QUALIFIED'
    WHEN 'PROPOSAL_SENT' THEN 'QUALIFIED'
    WHEN 'NEGOTIATING' THEN 'QUALIFIED'
    WHEN 'WON' THEN 'CONVERTED'
    WHEN 'LOST' THEN 'LOST'
    ELSE "status"::text
  END
)::"LeadStatus_new";
COMMIT;

