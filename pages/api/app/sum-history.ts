import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import prisma from "~/lib/prisma";

export default async function ProfileSumHistory(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getSession({ req });
  const userId = session?.user.id;

  if (userId == undefined) {
    return res.json({ error: { message: "You don't have access" } });
  }

  const data = await prisma.historySummary.findFirst({
    select: {
      countTrain: true,
      sumPoint: true,
      sumTrue: true,
      sumFalse: true,
      sumTimeSecond: true,
    },
    where: {
      userId,
    },
  });

  if (data == null) {
    return res.json({
      data: {
        countTrain: 0,
        sumPoint: 0,
        sumTrue: 0,
        sumFalse: 0,
        sumTimeSecond: 0,
      },
    });
  }

  return res.json({ data });
}
