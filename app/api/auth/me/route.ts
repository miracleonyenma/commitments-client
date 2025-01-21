import getMe from "@/utils/auth/me";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// const GET = async (request: Request) => {
const GET = async () => {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken");

  if (!accessToken) {
    // return NextResponse.redirect(new URL("/auth/register", request.url));
    // const url = new URL("/auth/register", request.url);
    // console.log("🚀 ~ file: route.ts ~ line 15 ~ GET ~ url", url);

    return NextResponse.json({ success: false });
  }

  const data = await getMe({ token: accessToken.value });

  if (data?.data?.me)
    cookiesStore.set("user", JSON.stringify(data.data.me), {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // 3 days
    });

  // console.log("🚀 ~ file: route.ts ~ line 22 ~ GET ~ data", data);

  return NextResponse.json(data);
};

export { GET };
