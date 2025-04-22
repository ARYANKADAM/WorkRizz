import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
// import Job from "@/models/jobs";
import jobs from "@/models/jobs";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { recruiterId } = params;

    const job = await jobs.find({ recruiterId }).sort({ createdAt: -1 });

    if (!jobs.length) {
      return NextResponse.json({ message: "No jobs found" }, { status: 404 });
    }

    return NextResponse.json(job, { status: 200 });
  } catch (error) {
    console.error("Error fetching jobs by recruiter:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
