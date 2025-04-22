import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import jobs from "@/models/jobs";
// import jobs from "@/models/jobs";

export async function POST(request) {
  try {
    await connectDB();

    const { recruiterId, title, description, requirements, location, salary } =
      await request.json();

    // Validate required fields
    if (
      !recruiterId ||
      !title ||
      !description ||
      !requirements ||
      !location ||
      !salary
    ) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Create new job posting
    const newJob = new jobs({
      recruiterId,
      title,
      description,
      requirements,
      location,
      salary,
    });

    await newJob.save();

    return NextResponse.json(
      { message: "Job posted successfully!", job: newJob },
      { status: 201 }
    );
  } catch (error) {
    console.error("Job posting error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const jobspostings = await jobs.find().sort({ createdAt: -1 });

    return NextResponse.json(jobspostings, { status: 200 });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}


