-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'SUPERUSER');

-- CreateEnum
CREATE TYPE "KegiatanType" AS ENUM ('LOMBA', 'INTERNAL');

-- CreateEnum
CREATE TYPE "AuditAction" AS ENUM ('CREATE', 'UPDATE', 'DELETE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contacts" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "whatsappUrl" TEXT,
    "instagramUrl" TEXT,
    "email" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Publikasi" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "author" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "attachmentUrl" TEXT,
    "imageUrl" TEXT,
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Publikasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kegiatan" (
    "id" TEXT NOT NULL,
    "type" "KegiatanType" NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "location" TEXT NOT NULL,
    "organizer" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "publicationUrl" TEXT,
    "registrationUrl" TEXT,
    "imageUrl" TEXT,
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Kegiatan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Departemen" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "photoUrl" TEXT,
    "description" TEXT,

    CONSTRAINT "Departemen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DepartemenStaff" (
    "id" TEXT NOT NULL,
    "departemenId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "photoUrl" TEXT,
    "identity" TEXT,
    "achievements" TEXT,

    CONSTRAINT "DepartemenStaff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgramKerja" (
    "id" TEXT NOT NULL,
    "departemenId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "ProgramKerja_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "action" "AuditAction" NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Publikasi_slug_key" ON "Publikasi"("slug");

-- CreateIndex
CREATE INDEX "Publikasi_publishedAt_idx" ON "Publikasi"("publishedAt" DESC);

-- CreateIndex
CREATE INDEX "Publikasi_category_publishedAt_idx" ON "Publikasi"("category", "publishedAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "Kegiatan_slug_key" ON "Kegiatan"("slug");

-- CreateIndex
CREATE INDEX "Kegiatan_type_date_idx" ON "Kegiatan"("type", "date" DESC);

-- CreateIndex
CREATE INDEX "Kegiatan_date_idx" ON "Kegiatan"("date" ASC);

-- CreateIndex
CREATE INDEX "Kegiatan_publishedAt_idx" ON "Kegiatan"("publishedAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "Departemen_slug_key" ON "Departemen"("slug");

-- CreateIndex
CREATE INDEX "DepartemenStaff_departemenId_idx" ON "DepartemenStaff"("departemenId");

-- CreateIndex
CREATE INDEX "ProgramKerja_departemenId_idx" ON "ProgramKerja"("departemenId");

-- CreateIndex
CREATE INDEX "AuditLog_userId_idx" ON "AuditLog"("userId");

-- CreateIndex
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt" DESC);

-- CreateIndex
CREATE INDEX "AuditLog_entityType_action_createdAt_idx" ON "AuditLog"("entityType", "action", "createdAt" DESC);

-- AddForeignKey
ALTER TABLE "DepartemenStaff" ADD CONSTRAINT "DepartemenStaff_departemenId_fkey" FOREIGN KEY ("departemenId") REFERENCES "Departemen"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramKerja" ADD CONSTRAINT "ProgramKerja_departemenId_fkey" FOREIGN KEY ("departemenId") REFERENCES "Departemen"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
