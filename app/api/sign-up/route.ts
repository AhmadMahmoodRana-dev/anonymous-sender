import bcrypt from "bcryptjs";
import connectDb from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import generateVerifyCode from "@/utils/generateVerifyCode";

export const POST = async (request: Request) => {
  await connectDb();
  try {
    const { username, email, password } = await request.json();

    const existingUSerVerifiedByUSerName = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUSerVerifiedByUSerName) {
      return Response.json(
        { success: false, message: "UserName Already Existing !!" },
        {
          status: 500,
        }
      );
    }

    const existingUserByEmail = await UserModel.findOne({ email });
    const verifyCode = generateVerifyCode(8);

    if (existingUserByEmail) {
    if(existingUserByEmail.isVerified){
      return Response.json(
        { success: false, message: "User Already Existing !!" },
        {
          status: 400,
        }
      );
    }
    else{
      const hashedPassword = await bcrypt.hash(password, 10);
      existingUserByEmail.password = hashedPassword;
      existingUserByEmail.verifyCode = verifyCode;
      existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)
      await existingUserByEmail.save()
    }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        isAcceptingMessage: true,
        isVerified: false,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        message: [],
        createdAt: Date,
      });

      await newUser.save();
    }

    // Send VErification Email
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );

if(!emailResponse.success){
 return Response.json( {success: false, message: emailResponse.message },{status:500})
}

return Response.json( {success: true, message: "User Registered Successfully | Plz verified Your Email !! " },{status:500})

  } catch (error) {
    console.error("Error Registering User", error);
   return Response.json(
      { success: false, message: "Error Registering User" },
      {
        status: 500,
      }
    );
  }
};
