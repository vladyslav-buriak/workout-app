-- CreateTable
CREATE TABLE "Exercises" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "times" INTEGER NOT NULL,

    CONSTRAINT "Exercises_pkey" PRIMARY KEY ("id")
);
