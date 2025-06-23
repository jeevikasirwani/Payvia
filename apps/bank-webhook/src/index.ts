import express from "express";
import db from "@repo/db/client";
import z from "zod";
const app = express();
const hdfcWebhookSchema = z.object({
  token: z.string().min(1, "Token is required"),
  user_identifier: z.number().min(1, "User identifier is required"),
  amount: z.number().positive("Amount must be positive"),
});
app.post("/hdfcWebhook", async (req, res) => {
  //TODO: Add zod validation here?
  const validatedData = hdfcWebhookSchema.parse(req.body);

  const paymentInformation = {
    token: validatedData.token,
    userId: validatedData.user_identifier,
    amount: validatedData.amount,
  };
  db.balance.update({
    where: {
      userId: paymentInformation.userId,
    },
    data: {
      amount: {
        increment: paymentInformation.amount,
      },
    },
  });
  await db.onRampTransaction.update({
    where: {
      token: paymentInformation.token,
    },
    data: {
      status: "Success",
    },
  });
  res.json({
    message: "captured",
  });
  // Update balance in db, add txn
});
