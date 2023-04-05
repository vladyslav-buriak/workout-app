import expressAsyncHandler from "express-async-handler";
import {prisma} from "../prisma.js";
export const addExercises = expressAsyncHandler(async (req, res) => {


    const{times ,name, iconPath } = req.body

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

    const exercises = await prisma.exercises.findMany()

    res.json(exercises)

}
)
