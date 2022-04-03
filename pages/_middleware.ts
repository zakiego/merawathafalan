import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware(req: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req, secret });
  const { host, protocol, pathname } = req.nextUrl;

  const url = `${protocol}//${host}`;

  if (token && pathname == "/") {
    return NextResponse.redirect(`${url}/app`);
  }
}
