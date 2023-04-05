/*
  Warnings:

  - Added the required column `icon_path` to the `Exercises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Exercises` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exercises" ADD COLUMN     "icon_path" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Workout" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ExercisesToWorkout" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ExercisesToWorkout_AB_unique" ON "_ExercisesToWorkout"("A", "B");

-- CreateIndex
CREATE INDEX "_ExercisesToWorkout_B_index" ON "_ExercisesToWorkout"("B");

-- AddForeignKey
ALTER TABLE "_ExercisesToWorkout" ADD CONSTRAINT "_ExercisesToWorkout_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExercisesToWorkout" ADD CONSTRAINT "_ExercisesToWorkout_B_fkey" FOREIGN KEY ("B") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;
