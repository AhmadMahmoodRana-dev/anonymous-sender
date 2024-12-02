import connectDb from "@/lib/dbConnect"
import UserModel, { Message } from "@/model/user.model"

const POST = async (request:Request) =>{
await connectDb()
const {username,content} = await request.json()
try {
    const User = await UserModel.findOne({username})
    if (!User){
        return Response.json(
            {
              success: false,
              message: "User not found",
            },
            {
              status: 404,
            }
          );
    }

    // is user accepting the messages
    if (!User.isAcceptingMessage){
        return Response.json(
            {
              success: false,
              message: "User Not Accepting Messages",
            },
            {
              status: 403,
            }
          );
    }
    const newMessage = {content , createdAt: new Date()}
    User.message.push(newMessage as Message) 
    await User.save()
} catch (error) {
  console.log("An unexpected Error Ocurred :",error)
  return Response.json(
    {
      success: false,
      message: "User not Authenticated",
    },
    {
      status: 401,
    }
  );
}
}