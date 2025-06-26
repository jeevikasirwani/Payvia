"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function createOnRampTransaction(
  provider: string,
  amount: number
) {
  const session = await getServerSession(authOptions);

  if (!session?.user || !session.user?.id) {
    return {
      success: false,
      message: "Unauthenticated request",
    };
  }

  const token = (Math.random() * 1000).toString();
  const userId = Number(session.user.id);
  const amountInPaise = amount * 100; // Convert to paise (smallest currency unit)

  try {
    // Use a database transaction to ensure atomicity
    await prisma.$transaction(async (tx) => {
      // Create the onramp transaction with Success status
      await tx.onRampTransaction.create({
        data: {
          provider,
          status: "Success", // Set to Success immediately for simulation
          startTime: new Date(),
          token: token,
          userId: userId,
          amount: amountInPaise,
        },
      });

      // Update or create the user's balance
      await tx.balance.upsert({
        where: { userId: userId },
        update: {
          amount: {
            increment: amountInPaise,
          },
        },
        create: {
          userId: userId,
          amount: amountInPaise,
          locked: 0,
        },
      });
    });

    console.log(
      `Transaction completed: ${token} for user ${userId} amount ${amountInPaise}`
    );

    return {
      success: true,
      message: "Transaction completed successfully",
      token: token,
    };
  } catch (error) {
    console.error("Error processing onramp transaction:", error);
    return {
      success: false,
      message: "Failed to process transaction",
    };
  }
}
