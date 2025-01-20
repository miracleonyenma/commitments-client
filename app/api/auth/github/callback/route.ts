import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const GET = async (request: NextRequest) => {
  const url = request.nextUrl.clone();
  const accessToken = request.nextUrl.searchParams.get("access_token");
  const refreshToken = request.nextUrl.searchParams.get("refresh_token");
  const userId = request.nextUrl.searchParams.get("user_id");

  if (!accessToken || !refreshToken) {
    url.pathname = "/auth/failure";
    url.searchParams.append("name", "github");
    url.searchParams.append("error", "No access token provided");
    return NextResponse.redirect(url);
  }

  console.log("🪵🪵🪵🪵🪵 ~ accessToken", accessToken);
  console.log("🪵🪵🪵🪵🪵 ~ refreshToken", refreshToken);

  (await cookies()).set("accessToken", accessToken);
  (await cookies()).set("refreshToken", refreshToken);
  if (userId) {
    (await cookies()).set("user_id", userId);
  }
  return NextResponse.redirect(new URL("/", request.url));
};

export { GET };
