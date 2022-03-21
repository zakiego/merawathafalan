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
  const offset = page == 0 ? 0 : 1;
  const data = await prisma.history.findMany({
    where: {
      userId,
    },
    // orderBy: [{ id: "desc" }],
    skip: page,
    take: 5,
  });

  return res.json({ data });
}
