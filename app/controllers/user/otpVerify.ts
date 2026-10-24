import otps from "../../model/otps.js";
import users from "../../model/user.js";
import tempUsers from "../../model/temp.js";
import tokens, { IJwt } from "../../model/jwt.js";
import { creatJwt } from "../../libs/auth.js";
import {
  genrater,
  amount
} from "../../libs/function.js"


export interface Status {
  status: boolean;
  message: string;
  code: number;
  jwt_token?: string;
}


async function Verify(
  url: string,
  otp: string
): Promise<Status> {
  try {
    if(!url || !otp){
      return {
        status: false,
        code: 400,
        message: "Missing required fields"
      }
    }
    
    const otpIn = await otps.findOne({
      url: url,
      otp_code: otp
    });
    if (!otpIn) {
      return {
        status: false,
        code: 400,
        message: "your otp code expired"
      }
    }
    const user = await users.findOne({
      user_name: otpIn.user_name
    });
    const newUser = await tempUsers.findOne({
      user_name: otpIn.user_name
    })
    if (user) {
      const newToken: string = creatJwt(user.user_name);
      await tokens.create<IJwt>({
        user_name: user.user_name,
        token: newToken
      })
      return {
        status: true,
        message: "Login successfully done",
        code: 200,
        jwt_token: newToken
      }
    }
    else if (newUser) {
      delete newUser.createdAt;
      newUser.api = {
        key: genrater("key"),
        usage: amount[ newUser.group ] ?? 0
      }
      try {
        await users.create(newUser);
        const newToken: string = creatJwt(user.user_name);
        await tokens.create<IJwt>({
          user_name: user.user_name,
          token: newToken
        })
        return {
          status: true,
          message: "Login successfully done",
          code: 200,
          jwt_token: newToken
        }
      } catch (error: any) {
        console.log("move Eror", error.message)
        return {
          status: false,
          code: 500,
          message: "user account create unsuccessful"
        }
      }
    }
  } catch (error:any) {
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

    console.error("Otp Verify control error:", error.message);
    return {
      status: false,
      code: 500,
      message: "Server error, try again"
    };
  }
}