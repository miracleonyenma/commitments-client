import loginUser from "@/utils/auth/loginUser";
import { cookies } from "next/headers";

const POST = async (request: Request) => {
  const body = await request.json();

  try {
    const data = await loginUser({ ...body });
    // console.log("🚀 ~ file: route.ts ~ line 13 ~ POST ~ data", data.data);

    if (data.data?.login.accessToken)
      (await cookies()).set("accessToken", data.data?.login.accessToken, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 3 days
      });
    if (data.data?.login.refreshToken)
      (await cookies()).set("refreshToken", data.data?.login.refreshToken, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
      });
    if (data.data?.login.user)
      (await cookies()).set("user", JSON.stringify(data.data?.login.user), {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 3 days
      });

    return Response.json(data);
  } catch (error) {
    return new Response((error as Error).message, { status: 500 });
  }
};

export { POST };
