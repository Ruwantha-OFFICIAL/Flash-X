import dotenv from 'dotenv';
import {
  describe,
  before,
  test
} from "node:test";
import assert from "node:assert/strict";
dotenv.config();

import { sendOtp } from '../../service/Mail/Otpsend.js';
import { sendRest } from '../../service/Mail/Password.js';

describe("MailService Check ✔️",()=>{
  const emai:string = "ruwanthalasith20@gmail.com";
  const otp:string = "580895";
  const link:string = "https://google.com/app";

  test("send otp code",async(t,done)=>{
    try{
      await sendOtp(otp,emai);
      done()
    }catch(err){
      console.log("otp send failed!,",err.message);
    }
  });
  test("send rest password",async(t,done)=>{
    try {
      await sendRest(link,emai);
      done();
    } catch (err) {
      console.log("Restart password mail failed!,",err.message);
    }
  });
})