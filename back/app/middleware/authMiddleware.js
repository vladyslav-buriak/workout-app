import expressAsyncHandler from "express-async-handler";

import jwt from "jsonwebtoken";
import {prisma} from "../prisma.js";
import {userField} from "../utils/userUtil.js";
import asyncHandler from 'express-async-handler'
export const protect = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
   
        const userFound = await prisma.user.findUnique({
            where: {
                id: decoded.id
            },
            select: userField
        })

        if (userFound) {
            req.user = userFound
            next()
        } else {
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, I do not have a token')
    }
})