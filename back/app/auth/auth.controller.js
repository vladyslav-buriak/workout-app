//@desc
//@roure POST /api/user/login
//@access Public


import expressAsyncHandler from "express-async-handler";
import {prisma} from "../prisma.js";
import {faker} from '@faker-js/faker';
import {generateToken} from "./generateToken.js";
import {verify, hash} from "argon2";
import {userField} from "../utils/userUtil.js";


export const authUser = expressAsyncHandler(async (req, res) => {
        const {password, email} = req.body;


        const user = await prisma.user.findUnique(
            {
                where: {email}
            }
        )
    const token = generateToken(user.id);

        const match = await verify(user.password, password);


        if (user && match) {
            res.json({user, token,})
        } else {
            res.status(401)
            throw new Error('email or password dosen t match')
        }


    }
)

export const registerUser = expressAsyncHandler(async (req, res) => {
    const {email, password, } = req.body;

    const isHaveUser = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (isHaveUser) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await prisma.user.create({

        data: {
            email,
            password: await hash(password),
            name: faker.name.fullName(),
        },


        select: userField
    })
    const token = generateToken(user.id);
    res.json({user, token,})
})


