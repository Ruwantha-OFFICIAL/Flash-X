import dotenv from 'dotenv';
import { describe, test } from "node:test";
import assert from "node:assert/strict";
dotenv.config();

import { sendOtp } from '../service/Mail/OtpSend.js';
import { sendRest } from '../service/Mail/Password.js';

describe("MailService Check ✔️",()=>{
  const emai = "ruwanthalasith20@gmail.com";
  const otp = "580895";
  const link = "https://google.com/app";

  test("send otp code", async ()=>{
    await sendOtp(otp, emai);
  });

  test("send rest password", async ()=>{
    await sendRest(link, emai);
  });
})