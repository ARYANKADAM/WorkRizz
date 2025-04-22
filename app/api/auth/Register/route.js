import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/user";
import bcrypt from "bcryptjs";

const ALLOWED_RECRUITER_KEY = "admin"; // ideally from env: process.env.RECRUITER_KEY

export async function POST(req) {
  await connectDB();

  const {
    username,
    email,
    password,
    phone,
    role,
    accessKey,
    age,
    workExperience,
    graduation,
    currentCourse,
    workStatus,
    profileScore,
  } = await req.json();

  // 🛡 Check access key for recruiter
  if (role === "recruiter" && accessKey !== ALLOWED_RECRUITER_KEY) {
    return NextResponse.json(
      { message: "Invalid recruiter access key" },
      { status: 403 }
    );
  }

  try {
    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      role,
      accessKey: role === "recruiter" ? accessKey : undefined,
      age,
      workExperience,
      graduation,
      currentCourse,
      workStatus,
      profileScore,
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Registration failed", error: error.message },
      { status: 500 }
    );
  }
}
