import tempUsers from "../../model/temp.js";
import users from "../../model/user.js";
import otps from "../model/otps.js";
import { genrater } from "../../libs/function.js";
import { sendOtp } from "../../service/Mail/Otpsend.js";

export interface Status {
  status: boolean;
  code: number;
  redirect?: string;
  message: string;
}

async function Login(
  email: string,
  passwd: string,
  userName: string,
): Promise<Status> {
  try {
    // Input validation
    if (!passwd || (!email && !userName)) {
      return {
        status: false,
        code: 400,
        message: "Missing required fields"
      };
    }
    const query = email
      ? { email: email, password: passwd }
      : { user_name: userName, password: passwd };

    const exitUser =
      await users.findOne(query) ||
      await tempUsers.findOne(query);

    if (!exitUser) {
      return {
        status: false,
        code: 401,
        message: "Invalid credentials"
      };
    }

    const targetEmail = exitUser.email;

    const otp: string = genrater("otp");
    const url: string = genrater("url");

    await otps.create({
      user_name: exitUser.user_name,
      otp_code: otp,
      url: url
    });

    await sendOtp(otp, targetEmail);

    return {
      status: true,
      code: 200,
      redirect: url,
      message: "OTP sent! Check your email."
    };

  } catch (error: any) {
    if (error.name === "ValidationError") {
      return {
        status: false,
        code: 400,
        message: error.message
      };
    }

    if (error.name === "CastError") {
      return {
        status: false,
        code: 400,
        message: "Invalid data format"
      };
    }

    console.error("Login control error:", error.message);
    return {
      status: false,
      code: 500,
      message: "Server error, try again"
    };
  }
}

export { Login };