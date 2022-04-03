import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import prisma from "~/lib/prisma";

export default async function helloAPI(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getSession({ req });
  const userId = session?.user.id;

  if (userId == undefined) {
    return res.json({ error: { message: "You don't have access" } });
  }

  const { point, countFalse, countTrue, timeSecond } = req.body;

  // add history
  const updateHistory = prisma.history.create({
    data: {
      userId,
      point,
      countFalse,
      countTrue,
      timeSecond,
    },
  });

  // if historySummary not exist, create
  const upsertHistorySummary = prisma.historySummary.upsert({
    where: {
      userId: userId,
    },
    create: {
      sumPoint: 0,
      sumFalse: 0,
      sumTrue: 0,
      sumTimeSecond: 0,
      countTrain: 0,
      userId,
    },
    update: {},
  });

  // add to historySummary
  const updateSummaryHistory = prisma.historySummary.updateMany({
    where: {
      userId: userId,
    },
    data: {
      countTrain: {
        increment: 1,
      },
      sumPoint: {
        increment: point,
      },
      sumFalse: {
        increment: countFalse,
      },
      sumTrue: {
        increment: countTrue,
      },
      sumTimeSecond: {
        increment: timeSecond,
      },
    },
  });

  const transactionHistory = await prisma.$transaction([
    updateHistory,
    upsertHistorySummary,
    updateSummaryHistory,
  ]);

  return res.json({ data: transactionHistory });
}
