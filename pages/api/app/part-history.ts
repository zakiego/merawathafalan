import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import prisma from "~/lib/prisma";

export default async function ProfilePartHistory(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getSession({ req });
  const userId = session?.user.id;

  if (userId == undefined) {
    return res.json({ error: { message: "You don't have access" } });
  }

  const page = parseInt(<string>req.query.page) || 0;
  const take = 10;
  const offset = page == 0 ? 0 : page * take;

  const data = await prisma.history.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      point: true,
      countTrue: true,
      countFalse: true,
      timeSecond: true,
      createdAt: true,
    },
    orderBy: [{ id: "desc" }],
    skip: offset,
    take: take,
  });

  const isLastPage = data.length < take ? true : false;

  return res.json({ data, isLastPage });
}
