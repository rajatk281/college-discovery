import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    try {
        const college = await prisma.college.findUnique({
            where: {
                id
            },
            include: {
                courses: true,
                reviews: true
            }
        })
        if (!college) {
            return NextResponse.json(
                {
                    success: false,
                    message: "College not found",
                },
                {
                    status: 404,
                }
            );
        }
        return NextResponse.json({
            success: true,
            data: college
        });


    } catch (error) {
        return NextResponse.json({ success: false, message: "Internal server Error" }, {status: 500})
    }
}