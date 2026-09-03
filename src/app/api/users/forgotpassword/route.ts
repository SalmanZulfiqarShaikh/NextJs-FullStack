import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connecttoDatabase } from "@/src/dbConfig/dbConfig";
import User from "@/src/models/userModel";
import { sendEmail, EmailType } from "@/src/helpers/mailer";

const forgotPasswordSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
});

export async function POST(req: NextRequest) {
  try {
    await connecttoDatabase();

    const reqBody = await req.json();

    const result = forgotPasswordSchema.safeParse(reqBody);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email } = result.data;

    const user = await User.findOne({ email });

    if (user) {
      try {
        await sendEmail({
          email: user.email,
          userId: user._id.toString(),
          emailType: EmailType.RESET,
        });
      } catch (error) {
        // Log but never fail the request: returning an error here would
        // reveal whether an account with this email exists.
        console.error("FAILED TO SEND RESET EMAIL:", error);
      }
    }

    // Always return the same message whether or not the account exists so
    // this endpoint can't be used to enumerate registered emails.
    return NextResponse.json(
      {
        message:
          "If an account exists for that email, a password reset link has been sent.",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("FORGOT PASSWORD ERROR:", error);

    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
