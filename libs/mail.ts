import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

// Global type declaration
declare global {
  var transport: Transporter | undefined;
}

export default async function getTransport(): Promise<Transporter | undefined> {
  try {
    if (!global.transport) {
      global.transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: "flashxicn@gmail.com",
          pass: "czxgbuakhhsmefpg",
        },
      });
      await  global.transport.verify();
      console.log('smtp server Done ✅')
    }

    return global.transport;
  } catch (error) {
    console.error('Failed to create transport:', error);
    return undefined;
  }
}
