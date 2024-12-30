import * as nodemailer from "nodemailer";
import dotenv from "dotenv";
import { SentryErrorClass } from "./errorHandling.js";
dotenv.config();

export const GOOGLE = "google";
export const EMAIL = "email";
const isProd = process.env.NODE_ENV === "production";
let nodemailer_settings = isProd
  ? {
      host: process.env.MAIL_SMTP_HOST_PROD,
      user: process.env.MAIL_SMTP_USER_PROD,
      pass: process.env.MAIL_SMTP_PASS_PROD,
      port: process.env.MAIL_SMTP_PORT_PROD
    }
  : {
      host: process.env.MAIL_SMTP_HOST,
      user: process.env.MAIL_SMTP_USER,
      pass: process.env.MAIL_SMTP_PASS,
      port: process.env.MAIL_SMTP_PORT
    };

const transporter = nodemailer.createTransport({
  host: nodemailer_settings.host,
  port: nodemailer_settings.port,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: nodemailer_settings.user,
    pass: nodemailer_settings.pass
  },
  tls: {
    rejectUnauthorized: false
  }
});

export const notifyTeam = async (text, subject) => {
  try {
    const mailOptions = {
      from: nodemailer_settings.user,
      to: "georgi@mentalyc.com",
      subject: subject,
      text: text
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        const message = `there was a problem with sending out email ${err.message}`;
        new SentryErrorClass(err, message);
      }
    });
  } catch (err) {
    const message = `got error sending mail to team ${err.message}`;
    new SentryErrorClass(err, message);
  }
};

export const notifyUser = async (text, email, subject) => {
  try {
    const mailOptions = {
      from: nodemailer_settings.user,
      to: email,
      subject: subject,
      text: text
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        const message = `There was a problem with sending email to ${email} ${err.message}`;
        new SentryErrorClass(err, message);
      }
    });
  } catch (err) {
    const message = `Error while generating a mail for user: ${err.message}`;
    new SentryErrorClass(err, message);
  }
};

export const normalizeEmail = email => email.toLowerCase().trim();
