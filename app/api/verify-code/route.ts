import connectDb from "@/lib/dbConnect";
import UserModel from "@/model/user.model";

export const POST = async (request: Request) => {
  await connectDb();
  try {
    const { username, code } = await request.json();
    const decodeUserName = decodeURIComponent(username);
    const user = await UserModel.findOne({ username: decodeUserName });
if(!user){
  return Response.json(
    { success: false, message: "User Not Found" },
    {
      status: 400,
    }
  );}

const isCodeVerified = user.verifyCode === code
const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()

if (isCodeNotExpired && isCodeVerified){
  user.isVerified = true;
  await user.save();
  return Response.json(
    { success: true, message: "User Verified Successfully" },
    {
      status: 200,
    }
  );
} else if(!isCodeNotExpired){
  return Response.json(
    { success: false, message: "Verify Code Expired" },
    {
      status: 400,
    }
  );
}
else{
  return Response.json(
    { success: false, message: "Invalid Verify Code" },
    {
      status: 400,
    }
  );
 
}


  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, message: "Error Verifing User" },
      {
        status: 500,
      }
    );
  }
};
