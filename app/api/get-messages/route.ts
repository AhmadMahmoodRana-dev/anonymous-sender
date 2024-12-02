import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import connectDb from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import { User } from "next-auth";
import mongoose from "mongoose";

const GET = async (request: Request) => {
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
  const userId = new mongoose.Types.ObjectId(user._id);
  try {
    const User = await UserModel.aggregate([
      { $match: { id: userId } },
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      {
        $group: {
          _id: "$_id",
          messages: {
            $push: "$messages",
          },
        },
      },
    ]);

    if (!User || User.length === 0) {
      return Response.json(
        {
          success: false,
          message: "User Not Found",
        },
        {
          status: 401,
        }
      );
    }
    return Response.json(
        {
          success: true,
          messages: User[0].messages ,
        },
        {
          status: 200,
        }
      );
  } catch (error) {}
};
