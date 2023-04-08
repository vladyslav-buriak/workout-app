import expressAsyncHandler from "express-async-handler";
import { prisma } from "../prisma.js";

export const addExercises = expressAsyncHandler(async (req, res) => {


    const { times, name, iconPath } = req.body

    const exercises = await prisma.exercises.create({

        data: {
            times,
            name,
            iconPath
        },
    })

    res.json(exercises)

}
)


export const getExercises = expressAsyncHandler(async (req, res) => {

    const exercises = await prisma.exercises.findMany(
      {  orderBy: {    
        createdAt: 'desc'  
    }}
    )

    res.json(exercises)

}
)


export const updateExercise = expressAsyncHandler(async (req, res) => {
    const { name, times, iconPath } = req.body

    try {
        const exercises = await prisma.exercises.update({
            where: {
                id: +req.params.id
            },
            data: {
                name,
                times,
                iconPath
            }
        })

        res.json(exercises)
    } catch (error) {
        res.status(404)
        throw new Error('Exercise not found!')
    }
})


export const deleteExercises = expressAsyncHandler(async (req, res) => {


    try {
         await prisma.exercises.delete({
            where: {
                id: +req.params.id
            },
        })

        res.json({ message: 'deleted' })
    } catch (error) {
        res.status(404)
        throw new Error('Exercise not found!')
    }
})






