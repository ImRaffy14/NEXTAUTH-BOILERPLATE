import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  context: any // 👈 bypass typing bug (TEMPORARY)
) {
  const userId = context.params.id;

  try {
    const { password } = await req.json();

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { error: "Password must be a valid string" },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    return NextResponse.json(
      { message: "Password updated", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update failed:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
