import { resend } from "@/lib/resend";
import VerificationEmail from "@/templates/verificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export const sendVerificationEmail = async (
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Anonymous Sender | Verification Code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    return { success: true, message: "SuccessFully Send Email !!" };
  } catch (error) {
    console.error("Error Sending Verification Email", error);
    return { success: false, message: "Failed to send email" };
  }
};
