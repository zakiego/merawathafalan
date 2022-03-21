import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import prisma from "~/lib/prisma";

export default async function LastHistory(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getSession({ req });
  const userId = session?.user.id;

  if (userId == undefined) {
    return res.json({ error: { message: "You don't have access" } });
  }

  const data = await prisma.history.findMany({
    select: {
      userId: false,
      id: true,
      point: true,
      countTrue: true,
      countFalse: true,
      timeSecond: true,
      createdAt: true,
    },
    where: { userId },
    orderBy: { id: "desc" },
    take: 5,
  });

  return res.json({ data });
}
