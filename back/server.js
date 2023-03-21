import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import express from "express";
import morgan from "morgan";
import {prisma} from "./app/prisma.js";

import authRoutes from "./app/auth/auth.routes.js";

dotenv.config()

const app = express();

async function main() {
    if (process.env.NODE_ENV === 'development') app.use(morgan
    ('dev'))
    app.use(express.json());
    app.use('/api/auth', authRoutes);

    const PORT = process.env.PORT || 5000

    app.listen(
        PORT,
        console.log(
            `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
        )
    )
}

main().then(async () => {
    await prisma.$disconnect()
})
    .catch(async e => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })