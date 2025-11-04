-- CreateTable
CREATE TABLE "public"."Class" (
    "id" SERIAL NOT NULL,
    "class" TEXT NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Class_class_key" ON "public"."Class"("class");
