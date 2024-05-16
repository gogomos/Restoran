/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `abonnenewsletter` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `abonnenewsletter_email_key` ON `abonnenewsletter`(`email`);
