import dotenv from "dotenv";
dotenv.config(); 
import {
  readTmplet
} from '../../libs/function.js'
import getTransport from '../../libs/mail.js';

async function sendRest(link:string,email:string): Promise<void> {
  const transport = await getTransport();
  
  if (!transport) {
    console.error("Transport initialize!");
    return;
  }

  try {
    console.log("Sending mail...");
    await  transport.verify();
    console.log("Done verify")
    const mail = await transport.sendMail({
      from: `Flash X • ${process.env.SMTP_USER}`,
      to: email, 
      subject: "very testing",
      html: readTmplet("./assets/restTemplet.html").replaceAll("{{{reset_link}}}",link)
    });

    console.log("Message sent! ID: %s", mail.messageId);
  } catch (error) {
    console.error("Error sending mail:", error);
    throw new Error(error.message);
}

}

export {
  sendRest
}