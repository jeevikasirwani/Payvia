import express from "express";
import db from "@repo/db/client";
import z from "zod";
const app = express();
const hdfcWebhookSchema = z.object({
  token: z.string().min(1, "Token is required"),
  user_identifier: z.number().min(1, "User identifier is required"),
  amount: z.number().positive("Amount must be positive"),
});

// for pending transactions

async function processPendingTransactions() {
  try {
    const pendingT = await db.onRampTransaction.findMany({
      where: { status: "Processing" },
    });

    for (const transaction of pendingT) {
      await db.$transaction([
        db.balance.update({
          where: { userId: transaction.userId },
          data: {
            amount: {
              increment: transaction.amount,
            },
          },
        }),
        db.onRampTransaction.update({
          where: { id: transaction.id },
          data: { status: "Success" },
        }),
      ]);
    }

    console.log(`Processed ${pendingT.length} pending transactions.`);
  } catch (error) {
    console.error("Error processing pending transactions:", error);
  }
}

// for new transactions
app.post("/hdfcWebhook", async (req, res) => {
  //TODO: Add zod validation here?
  const validatedData = hdfcWebhookSchema.safeParse(req.body);

  if (!validatedData.success) {
    res.status(400).send(validatedData.error);
    return;
  }

  const paymentInformation = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };
  try {
    // Use a database transaction to ensure atomicity
    await db.$transaction(async (tx) => {
      // First, upsert the balance (create if doesn't exist, update if exists)
      await tx.balance.upsert({
        where: {
          userId: paymentInformation.userId,
        },
        update: {
          amount: {
            increment: paymentInformation.amount,
          },
        },
        create: {
          userId: paymentInformation.userId,
          amount: paymentInformation.amount,
          locked: 0,
        },
      });

      // Then update the transaction status
      await tx.onRampTransaction.update({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      });
    });

    console.log(`Transaction ${paymentInformation.token} processed successfully`);
    res.json({
      message: "captured",
    });
  } catch (e) {
    console.error("Error processing payment:", e);
    res.status(411).json({ message: "Error while processing payment" });
  }
});