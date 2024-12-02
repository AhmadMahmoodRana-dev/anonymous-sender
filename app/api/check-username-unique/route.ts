import { z } from "zod";
import connectDb from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import { usernameValidation } from "@/schemas/signupSchema";

const userNameQuerySchema = z.object({
  username: usernameValidation,
});

export const GET = async (request: Request) => {
  console.log("REQUSET METHOD", request);
  await connectDb();
  try {
    const { searchParams } = new URL(request.url);
    const queryParams = {
      username: searchParams.get("username"),
    };

    const validatedQuery = userNameQuerySchema.safeParse(queryParams);
    console.log("validatedQuery", validatedQuery);

    if (!validatedQuery.success) {
      const usernameError =
        validatedQuery.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameError?.length > 0
              ? usernameError.join(",")
              : "Invalid Query Parameters",
        },
        { status: 400 }
      );
    }
    const { username } = validatedQuery.data;

    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: "true",
    });
    if (existingVerifiedUser) {
      return Response.json(
        { success: false, message: "Username Alredy Exist " },
        {
          status: 400,
        }
      );
    }
    return Response.json(
      { success: true, message: "Username is Avilable" },
      {
        status: 400,
      }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, message: "Error Checking Username" },
      {
        status: 500,
      }
    );
  }
};
