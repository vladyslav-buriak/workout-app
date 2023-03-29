//@desc
//@roure POST /api/user/login
//@access Public


import expressAsyncHandler from "express-async-handler";
import {prisma} from "../prisma.js";
import {faker} from '@faker-js/faker';
import {generateToken} from "./generateToken.js";
import argon2 from "argon2";
import {userField} from "../utils/userUtil.js";


export const authUser = expressAsyncHandler(async (req, res) => {
    const user = await prisma.user.findMany(
        {
            where: {password1: 'fegd'}
        }
    )
    res.json(user)
})

export const registerUser = expressAsyncHandler(async (req, res) => {
    const {email, password, id} = req.body;

    const isHaveUser = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (isHaveUser) {
        res.status(400)
        throw new Error('User already exists')
    }
    const token = generateToken(id);
    const user = await prisma.user.create({

        data: {
            email,
            password: await argon2.hash(password),
            name: faker.name.fullName(),
        },

        select: userField
    })
    res.json({user, token,})
})