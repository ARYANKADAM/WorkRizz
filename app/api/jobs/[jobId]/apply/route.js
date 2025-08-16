import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import JobApplication from "@/models/jobApplication";
import User from "@/models/user";
import Job from "@/models/jobs";

export async function POST(request, { params }) {
  try {
    await connectDB();
    const { jobId } = params;
    const { username, email, profileScore } = await request.json();

    // Validate required fields
    if (!jobId || !username || !email || profileScore === undefined) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Get user details
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return NextResponse.json(
        { message: "Job not found" },
        { status: 404 }
      );
    }
    

    // Check if already applied
    const existingApplication = await JobApplication.findOne({
      jobId,
      employeeId: user._id,
    });

    if (existingApplication) {
      return NextResponse.json(
        { message: "You have already applied for this job" },
        { status: 400 }
      );
    }

    // Create new application
    const newApplication = new JobApplication({
      jobId,
      employeeId: user._id,
      employeeEmail: email,
      profileScore
    });

    await newApplication.save();

    // Increment the applications count
    await Job.findByIdAndUpdate(jobId, {
      $inc: { applicationsCount: 1 }
    });

    return NextResponse.json(
      {
        message: "Application submitted successfully",
        application: newApplication,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Job application error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}