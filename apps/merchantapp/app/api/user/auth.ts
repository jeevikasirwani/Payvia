import { NextResponse } from "next/server"
import {PrismaClient} from "@prisma/client";

const client = new PrismaClient();

export const GET = async () => {
    await client.user.create({
        data: {
            email: "asd",
            name: "adsads",
            number: "1234567890",
            password: "yourPasswordHere"
        }
    })
    return NextResponse.json({
        message: "hi there"
    })
}