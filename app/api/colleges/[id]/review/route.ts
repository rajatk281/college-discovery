import { verifyToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { reviewSchema } from "@/lib/validation/auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    

    try {
        const { id } = await params;
        const authHeader = request.headers.get("authorization")
        const token = authHeader?.split(" ")[1];
        if (!token) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized user"
            },
                {
                    status: 401
                })
        }
        const decoded = verifyToken(token);
        const college = await prisma.college.findUnique({
            where: {
                id,
            },
        });
        if (!college) {
            return NextResponse.json({
                success: false,
                message: "College not found"
            }, {
                status: 404
            })
        }
        const body = await request.json();
        const validatedData = reviewSchema.parse(body);
        const { comment, rating } = validatedData;
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.userId,
            },
        });
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found",
            },
                {
                    status: 404
                })
        }
        const review = await prisma.review.create({
            data: {
                comment,
                rating,
                userName: user!.name,
                collegeId: id,
            },
        });
        return NextResponse.json(
            {
                success: true,
                message: "Review added successfully",
                data: review
            },
            {
                status: 201,
            }
        );

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                success: false,
                message: "Server error while adding review",
            },
            {
                status: 500,
            }
        );

    }
}