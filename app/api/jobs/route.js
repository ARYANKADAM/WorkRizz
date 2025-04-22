import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Job from "@/models/jobs"; // your Mongoose model
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

function verifyToken(req) {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  try {
    return jwt.verify(auth.split(" ")[1], JWT_SECRET);
  } catch {
    return null;
  }
}

export async function GET(req) {
  await connectDB();
  const jobs = await Job.find().sort({ createdAt: -1 });
  return NextResponse.json(jobs);
}

export async function POST(req) {
  await connectDB();
  const user = verifyToken(req);
  if (!user || user.role !== "recruiter") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let payload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const { title, description, requirements, location, salary, status } =
    payload;
  // validate
  if (!title || !description || !requirements || !location || !salary) {
    return NextResponse.json(
      { message: "All fields are required." },
      { status: 400 }
    );
  }

  try {
    const job = new Job({
      title,
      description,
      requirements,
      location,
      salary,
      status: status || "Active",
      recruiterId: user.userId,
    });
    await job.save();
    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error("Error saving job:", error);
    return NextResponse.json(
      { message: "Error saving job", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  await connectDB();
  const user = verifyToken(req);
  if (!user || user.role !== "recruiter") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { pathname } = new URL(req.url);
  const id = pathname.split("/").pop();
  const updates = await req.json();
  const job = await Job.findByIdAndUpdate(id, updates, { new: true });
  return NextResponse.json(job);
}

export async function DELETE(req) {
  await connectDB();
  const user = verifyToken(req);
  if (!user || user.role !== "recruiter") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { pathname } = new URL(req.url);
  const id = pathname.split("/").pop();
  await Job.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" });
}
