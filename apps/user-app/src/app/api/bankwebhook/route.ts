import { NextRequest, NextResponse } from "next/server";
import prisma from "@repo/db/client";

export async function POST(req: NextRequest) {
  // Ensure the request method is POST
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: 405 }
    );
  }

  try {
    // Parse the request body
    const { token, id, amount } = await req.json();
    const userId = Number(id);
    // Validate the request payload
    if (!token || !userId || !amount) {
      return NextResponse.json(
        {
          message: "Invalid request payload",
        },
        { status: 400 }
      );
    }

    // Perform database operations in a transaction
    await prisma.$transaction([
      prisma.balance.update({
        where: {
          userId,
        },
        data: {
          amount: {
            increment: amount*100,
          },
        },
      }),
      prisma.onRampTransaction.update({
        where: {
          token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);

    // Respond with success
    return NextResponse.json(
      {
        message: "Captured",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error during transaction:", error);

    // Respond with an error
    return NextResponse.json(
      {
        message: "Error while processing webhook",
        error: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  // Ensure the request method is GET
  if (req.method !== "GET") {
    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: 405 }
    );
  }

  // Respond with success
  return NextResponse.json(
    {
      message: "Running",
    },
    { status: 200 }
  );
}
