//@desc
//@roure GET /api/user/
//@access Public


import expressAsyncHandler from "express-async-handler";
import {prisma} from "../prisma.js";
import {userField} from "../utils/userUtil.js";


export const getUserProfile = expressAsyncHandler(async (req, res) => {
  
        const user = await prisma.user.findUnique(
            {
                where: {id: req.user.id},
                select: userField
            },
        )

        res.json(user)

    }
)



