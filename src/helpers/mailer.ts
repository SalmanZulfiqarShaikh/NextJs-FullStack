import { randomBytes, createHash } from "crypto";
import nodemailer from "nodemailer";
import User from "@/src/models/userModel";

export enum EmailType {
  VERIFY = "VERIFY",
  RESET = "RESET",
  WELCOME = "WELCOME",
}

const TOKEN_EXPIRY_MS = 60 * 60 * 1000; // 1 hour

interface SendEmailParams {
  email: string;
  emailType: EmailType;
  userId: string;
  username?: string;
}

const REQUIRED_SMTP_VARS = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS"];

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendEmail({
  email,
  emailType,
  userId,
  username,
}: SendEmailParams): Promise<void> {
  const missingVars = REQUIRED_SMTP_VARS.filter((key) => !process.env[key]);

  if (missingVars.length > 0) {
    throw new Error(
      `Cannot send email: missing required SMTP env vars (${missingVars.join(", ")}). ` +
        "Add SMTP_HOST, SMTP_PORT, SMTP_USER and SMTP_PASS to your environment."
    );
  }

  // VERIFY / RESET emails carry a one-time link, so persist a sha256 hash of
  // the raw token plus a 1-hour expiry on the right user fields. The raw
  // token itself is never stored - only emailed - and later matched by hashing
  // the token the user submits back. WELCOME emails need no token or DB write.
  const isTokenEmail =
    emailType === EmailType.VERIFY || emailType === EmailType.RESET;

  let rawToken = "";

  if (isTokenEmail) {
    rawToken = randomBytes(32).toString("hex");
    const hashedToken = createHash("sha256").update(rawToken).digest("hex");
    const expiry = new Date(Date.now() + TOKEN_EXPIRY_MS);

    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ email });

    if (!user) {
      throw new Error(
        `Cannot send ${emailType} email: no user found for ${email}`
      );
    }

    if (emailType === EmailType.VERIFY) {
      user.verifyToken = hashedToken;
      user.verifyTokenExpiry = expiry;
    } else {
      user.forgotPasswordToken = hashedToken;
      user.forgotPasswordTokenExpiry = expiry;
    }

    await user.save();
  }

  const appUrl = (process.env.APP_URL || "http://localhost:3000").replace(
    /\/$/,
    ""
  );
  const displayName = username
    ? username.trim().split(" ")[0]
    : email.split("@")[0];

  let subject: string;
  let text: string;
  let html: string;

  switch (emailType) {
    case EmailType.VERIFY: {
      const url = `${appUrl}/verifyemail?token=${rawToken}`;

      subject = "Verify your email address";
      text = `Hi ${displayName},\n\nPlease verify your email address to activate your account:\n${url}\n\nThis link expires in 1 hour. If you didn't create an account, you can ignore this email.`;
      html = `
        <p>Hi ${escapeHtml(displayName)},</p>
        <p>Thanks for signing up. Please verify your email address to activate your account.</p>
        <p><a href="${url}">Verify my email</a></p>
        <p>Or copy and paste this link into your browser:</p>
        <p>${url}</p>
        <p>This link expires in 1 hour. If you didn't create an account, you can ignore this email.</p>
      `;
      break;
    }

    case EmailType.RESET: {
      const url = `${appUrl}/resetpassword?token=${rawToken}`;

      subject = "Reset your password";
      text = `Hi ${displayName},\n\nWe received a request to reset your password. Click the link below to choose a new one:\n${url}\n\nThis link expires in 1 hour. If you didn't request this, you can safely ignore this email.`;
      html = `
        <p>Hi ${escapeHtml(displayName)},</p>
        <p>We received a request to reset your password. Click the link below to choose a new one:</p>
        <p><a href="${url}">Reset my password</a></p>
        <p>Or copy and paste this link into your browser:</p>
        <p>${url}</p>
        <p>This link expires in 1 hour. If you didn't request this, you can safely ignore this email.</p>
      `;
      break;
    }

    case EmailType.WELCOME: {
      subject = "Welcome aboard!";
      text = `Hi ${displayName},\n\nYour email has been verified and your account is now active. Welcome aboard!`;
      html = `
        <p>Hi ${escapeHtml(displayName)},</p>
        <p>Your email has been verified and your account is now active. Welcome aboard!</p>
      `;
      break;
    }

    default: {
      const _exhaustive: never = emailType;
      throw new Error(`Unhandled EmailType: ${_exhaustive}`);
    }
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: email,
    subject,
    text,
    html,
  });
}
