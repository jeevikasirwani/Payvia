"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function createOnRampTransaction(provider: string, amount: number) {
    // Get user session
    const session = await getServerSession(authOptions);
    
    if (!session?.user || !session.user?.id) {
        return {
            message: "Unauthenticated request"
        }
    }

    // Generate unique token for this transaction
    const token = (Math.random() * 1000).toString();
    
    try {
        // Create pending onramp transaction
        await prisma.onRampTransaction.create({
            data: {
                provider,
                status: "Processing", // Keep as Processing until webhook confirms
                startTime: new Date(),
                token: token,
                userId: Number(session.user.id),
                amount: amount * 100 // Store in smallest currency unit (paise)
            }
        });

        return {
            message: "Transaction initiated successfully",
            token: token // You might want to return this for debugging
        }
    } catch (error) {
        console.error("Error creating onramp transaction:", error);
        return {
            message: "Failed to create transaction"
        }
    }
}