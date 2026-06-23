import { loginSchema } from "@/lib/validation/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const POST = async (request: NextRequest) => {
    const body = await request.json();
    const validateData = loginSchema.parse(body);

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: validateData.email
            }
        })
        if (!user) {
            return NextResponse.json({
                success: false,
                messsage: "User does not exist"
            }, {
                status: 401
            })
        }

        const isPasswordCorrect = await bcrypt.compare(validateData.password, user.password);
        if (!isPasswordCorrect) {
            return NextResponse.json({
                success: false,
                message: "Invalid password"
            },
                {
                    status: 401
                })
        }

        const token = jwt.sign({
            userId: user.id,
            email: user.email,
            role: user.role
        },
            process.env.JWT_SECRET!,
            {
                expiresIn: "7d"
            })

        return NextResponse.json({
            success: true,
            message: "Login successful",
            token,
        });

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong",
            },
            {
                status: 500,
            }
        );
    }

}