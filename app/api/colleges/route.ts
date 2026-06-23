import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const GET = async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams;

    const search = searchParams.get("search");
    const location = searchParams.get("location");
    const minFees = searchParams.get("minFees");
    const sort = searchParams.get("sort");

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.name = {
        contains: search,
        mode: "insensitive"
      }
    }
    if (location) {
      where.location = {
        contains: location,
        mode: "insensitive"
      }
    }
    if (minFees) {
      where.fees = {
        gte: Number(minFees),
      };
    }

    let orderBy = {};
    if (sort === "fees_asc") {
      orderBy = {
        fees: "asc",
      };
    }
    if (sort === "fees_desc") {
      orderBy = {
        fees: "desc",
      };
    }

    const colleges = await prisma.college.findMany({
      where, orderBy, skip, take: limit
    });
    const totalColleges = await prisma.college.count({where})

    return NextResponse.json({
      success: true,
      page, 
      limit,
      totalColleges,
      totalPages: Math.ceil(totalColleges/limit),
      data: colleges,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Database connection failed",
      },
      { status: 500 }
    );
  }
}