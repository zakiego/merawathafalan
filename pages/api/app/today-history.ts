import lodash from "lodash";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { dateTodayAndTomorrow } from "~/helper/time";
import prisma from "~/lib/prisma";

export default async function TodayHistory(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getSession({ req });
  const userId = session?.user.id;

  if (userId == undefined) {
    return res.json({ error: { message: "You don't have access" } });
  }

  const { today, tomorrow } = dateTodayAndTomorrow();

  const data = await prisma.history.findMany({
    select: {
      userId: false,
      // id: true,
      point: true,
      // countTrue: true,
      // countFalse: true,
      timeSecond: true,
      // createdAt: true,
    },
    where: {
      userId,
      createdAt: {
        gte: today,
        lt: tomorrow,
      },
    },
    // orderBy: { id: "desc" },
  });

  const sumTimeSecond = lodash.sumBy(data, "timeSecond");
  const sumPoint = lodash.sumBy(data, "point");
  const countTrain = data.length;

  return res.json({ data: { sumTimeSecond, countTrain, sumPoint } });
}
