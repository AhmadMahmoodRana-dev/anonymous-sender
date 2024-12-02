import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import connectDb from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import { User } from "next-auth";

export const POST = async (request: Request) => {
  await connectDb();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Please Authenticate First",
      },
      {
        status: 401,
      }
    );
  }
  const userId = user?._id;
  const { acceptMessages } = await request.json();

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessage: acceptMessages },
      { new: true }
    );
    if (!updatedUser) {
      return Response.json(
        {
          success: false,
          message: "error to accept messages",
        },
        {
          status: 401,
        }
      );
    }
    return Response.json(
      { success: true, message: "Messages accepted" },
      { status: 200 }
    );
  } catch (error) {
    console.log("error to accept messages", error);
    return Response.json(
      {
        success: false,
        message: "error to accept messages",
      },
      {
        status: 500,
      }
    );
  }
};

export const GET = async (request: Request) => {
  await connectDb();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Please Authenticate First",
      },
      {
        status: 401,
      }
    );
  }
  const userId = user?._id;
  try {
    const foundUser = await UserModel.findById(userId);
    if (!foundUser) {
      return Response.json(
        {
          success: false,
          message: "User Not Found",
        },
        {
          status: 404,
        }
      );
    }
    return Response.json(
      { success: true, isAcceptingMessages: foundUser.isAcceptingMessage },
      { status: 200 }
    );
  } catch (error) {
    console.log("error to found user", error);
    return Response.json(
      {
        success: false,
        message: "error to found user",
      },
      {
        status: 500,
      }
    );
  }
};
