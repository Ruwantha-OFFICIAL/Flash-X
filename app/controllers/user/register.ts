import tempUsers, { ITmpUser } from "../../model/temp.js";
import users from "../../model/user.js";

export interface Status {
  status: boolean;
  code?: number;
  message: string;
}

async function Register(
  email: string,
  passwd: string,
  userName: string,
): Promise<Status> {
  try {
    if (!passwd || (!email && !userName)) {
      return {
        status: false,
        code: 400,
        message: "Missing required fields"
      };
    }

    const exitUser = await users.findOne({
      $or: [{ email: email }, { user_name: userName }],
    });
    const exitTmp = await tempUsers.findOne({
      $or: [{ email: email }, { user_name: userName }],
    });

    if (exitUser) {
      return {
        status: false,
        code: 409,
        message: "User already exists, check your username & email",
      };
    } else if (exitTmp) {
      return {
        status: false,
        code: 409,
        message: "User already registered, go to login",
      };
    } else {
      const user: ITmpUser = {
        user_name: userName,
        email: email,
        password: passwd,
        group: 0,
      } as ITmpUser;

      await tempUsers.create(user);
      return {
        status: true,
        code: 200,
        message: "User registered successfully, go back to login"
      };
    }
  } catch (error: any) {
    if (error.code === 11000) {
      return {
        status: false,
        code: 409,
        message: "User already registered, go to login"
      };
    }
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
        message: "Invalid ID format"
      };
    }
    console.log("control error:", error.message);
    return {
      status: false,
      code: 500,
      message: "Server error, try again"
    };
  }
}

export { Register };
