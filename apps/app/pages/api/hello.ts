// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import prisma from "~/lib/prisma";

export default async function helloAPI(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getSession({ req });

  // const data = await prisma.user.findFirst({
  //   where: { id: "cl06korkd0006jfcx350x0bmo" },
  //   select: { username: true },
  // });

  // const data = await prisma.user.findMany({});

  // if (data) {
  //   return res.status(200).json(data);
  // }

  if (session) {
    return res.status(200).json({ name: "John Doe" });
  }

  res.status(200).json({
    error: "You must be sign in to view the protected content on this page.",
  });
}
