import express from "express";
import prisma  from "@repo/db/client";

const app = express();

app.use(express.json());

app.post("/hdfcwebhook", async (req : any, res : any) => {
  const paymentInfo = {
    token: req.body.token,
    userId: req.body.userId,
    amount: req.body.amount,
  };

  if (!paymentInfo.token || !paymentInfo.userId || !paymentInfo.amount) {
    return res.status(400).json({
      message: "Invalid request payload",
    });
  }

  try {
    await prisma.$transaction([
      prisma.balance.update({
        where: {
          userId: paymentInfo.userId,
        },
        data: {
          amount: {
            increment: paymentInfo.amount,
          },
        },
      }),
      prisma.onRampTransaction.update({
        where: {
          token: paymentInfo.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);

    return res.status(200).json({
      message: "Captured",
    });
  } catch (error : any) {
    console.error("Error during transaction:", error);

    return res.status(500).json({
      message: "Error while processing webhook",
      error: error.message,
    });
  }
});

app.listen(3003);
