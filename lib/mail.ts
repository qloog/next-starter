// import { Resend } from "resend";
import nodemailer from "nodemailer";
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

// const resend = new Resend(process.env.RESEND_API_KEY);
const from = process.env.NODEMAILER_SENDER;

const domain = process.env.NEXT_PUBLIC_APP_URL;

const smtpConfig: SMTPTransport.Options = {
  host: process.env.NODEMAILER_HOST as string,
  port: parseInt(process.env.NODEMAILER_PORT || '587'),
  secure: Boolean(process.env.NODEMAILER_SECURE), // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
  debug: true,   // show debug output
  logger: true,  // log information in console
}
const transporter = nodemailer.createTransport(smtpConfig);

export const sendVerificationEmail = async (
  email: string, 
  token: string
) => {
  const confirmLink = `${domain}/new-verification?token=${token}`;

  await transporter.sendMail({
    from: from,
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`
  }, (error, info) => {
    if (error) {
      console.log('sendVerificationEmail error: ' + error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};


export const sendPasswordResetEmail = async (
  email: string,
  token: string,
) => {
  const resetLink = `${domain}/new-password?token=${token}`

  await transporter.sendMail({
    from: from,
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`
  }, (error, info) => {
    if (error) {
      console.log('sendVerificationEmail error: ' + error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

