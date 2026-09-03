import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { connecttoDatabase } from "@/src/dbConfig/dbConfig";
import User from "@/src/models/userModel";
import { sendEmail, EmailType } from "@/src/helpers/mailer";

export async function POST(req: NextRequest) {
  try {
    await connecttoDatabase();

    const reqBody = await req.json();
    const token = reqBody?.token;

    if (typeof token !== "string" || token.trim() === "") {
      return NextResponse.json(
        { error: "Invalid or expired verification link" },
        { status: 400 }
      );
    }

    const hashedToken = createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      verifyToken: hashedToken,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired verification link" },
        { status: 400 }
      );
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    await sendEmail({
      email: user.email,
      userId: user._id.toString(),
      username: user.name,
      emailType: EmailType.WELCOME,
    });

    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("VERIFY EMAIL ERROR:", error);

    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
