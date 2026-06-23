import { verifyToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const authHeader = request.headers.get("authorization")
    const token = authHeader?.split(" ")[1];
    try {
        const { id } = await params;
        if (!token) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                {
                    status: 401,
                }
            );
        }
        const decoded = verifyToken(token);
        const college =
            await prisma.college.findUnique({
                where: {
                    id: id,
                },
            });
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
        const alreadySaved = await prisma.savedCollege.findFirst({
            where: {
                userId: decoded.userId,
                collegeId: id,
            },
        });

        if (alreadySaved) {
            return NextResponse.json(
                {
                    success: false,
                    message: "College already saved",
                },
                {
                    status: 400,
                }
            );
        }
        await prisma.savedCollege.create({
            data: {
                userId: decoded.userId,
                collegeId: id,
            },
        });
        return NextResponse.json(
            {
                success: true,
                message: "College saved successfully",
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to save college",
            },
            {
                status: 500,
            }
        );
    }
}

export const DELETE = async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {
    try {
        const { id } = await params;

        const authHeader = request.headers.get("authorization");
        const token = authHeader?.split(" ")[1];

        if (!token) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                {
                    status: 401,
                }
            );
        }

        const decoded = verifyToken(token);

        const savedCollege = await prisma.savedCollege.findFirst({
            where: {
                userId: decoded.userId,
                collegeId: id,
            },
        });

        if (!savedCollege) {
            return NextResponse.json(
                {
                    success: false,
                    message: "College not found in saved list",
                },
                {
                    status: 404,
                }
            );
        }

        await prisma.savedCollege.delete({
            where: {
                id: savedCollege.id,
            },
        });

        return NextResponse.json(
            {
                success: true,
                message: "College removed successfully",
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to remove college",
            },
            {
                status: 500,
            }
        );
    }
};