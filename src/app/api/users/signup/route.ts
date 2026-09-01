import { connecttoDatabase } from "@/src/dbConfig/dbConfig";
import User from "@/src/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    // Connect to MongoDB
    await connecttoDatabase();

    // Get request body
    const reqBody = await req.json();

    const { username, email, password } = reqBody;

    // Validate required fields
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    // Frontend uses "username", database schema uses "name"
    const newUser = new User({
      name: username,
      email,
      password: hashedPassword,
    });

    // Save user to MongoDB
    await newUser.save();

    return NextResponse.json(
      {
        message: "User created successfully",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("🔥 SIGNUP ERROR:", error);

    return NextResponse.json(
      {
        error: error.message || "Something went wrong",
      },
      { status: 500 }
    );
  }
}
