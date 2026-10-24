import jwt from "jsonwebtoken";

export interface Jwt {
  user: string,
  password: string
}

export function creatJwt(userName: string): string {
  const data: Jwt = {
    user: userName,
    password: "#app"
  }
  const token = jwt.sign(
    data,
    process.env.JWT_SECRET,
  )
  return token;
}

export function chekJwt(token: string): Jwt {
  try {
    const decode: Jwt = jwt.verify(token, process.env.JWT_SECRET)
    return decode;
  } catch (error: any) {
    throw new Error("Invalid Token")
  }
}