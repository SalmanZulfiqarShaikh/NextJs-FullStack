import { connecttoDatabase } from "@/src/dbConfig/dbConfig";
import User from "@/src/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const loginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, "Username or email is required"),

  password: z
    .string()
    .min(1, "Password is required"),
});

export async function POST(req: NextRequest) {
  try {
    await connecttoDatabase();

    const reqBody = await req.json();

    const result = loginSchema.safeParse(reqBody);

    if (!result.success) {
      return NextResponse.json(
        {
          error: result.error.issues[0].message,
        },
        { status: 400 }
      );
    }

    const { identifier, password } = result.data;

    const isEmail = identifier.includes("@");

    let user;

    if (isEmail) {
      user = await User.findOne({ email: identifier });

      if (!user) {
        return NextResponse.json(
          { error: "No account found with this email" },
          { status: 404 }
        );
      }
    } else {
      user = await User.findOne({ name: identifier });

      if (!user) {
        return NextResponse.json(
          { error: "Username not found" },
          { status: 404 }
        );
      }
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { userId: user._id.toString() },
      JWT_SECRET!,
      { expiresIn: "1d" }
    );

    const response = NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user._id.toString(),
          username: user.name,
          email: user.email,
        },
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;

  } catch (error: any) {
    console.error("LOGIN ERROR:", error);

    return NextResponse.json(
      {
        error: error.message || "Something went wrong",
      },
      { status: 500 }
    );
  }
}