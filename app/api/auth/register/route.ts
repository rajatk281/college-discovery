import prisma from "@/lib/prisma";
import { registerSchema } from "@/lib/validation/auth";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server"

export const POST = async (request: NextRequest) => {
    const body = await request.json();
    const validateData = registerSchema.parse(body)
    const existingUser = await prisma.user.findUnique({
        where: {
            email: validateData.email
        }

    })
    if (existingUser) {
        return NextResponse.json({
            success: false,
            message: "User already exists"
        }, {
            status
                : 400
        })
    }

    const hashedPassword = await bcrypt.hash(validateData.password, 10);

    const user = await prisma.user.create({
        data: {
            name: validateData.name,
            email: validateData.email,
            password: hashedPassword
        }
    })

    return NextResponse.json({
        succes: true, message: "User created successfully"
    })

}