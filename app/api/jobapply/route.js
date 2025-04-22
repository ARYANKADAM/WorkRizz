import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
// import JobApplication from "@/models/jobApplication";
import jobApplication from "@/models/jobApplication";
import User from "@/models/user";
import jobs from "@/models/jobs";

export async function POST(request) {
  try {
    await connectDB();

    const { jobId, employeeEmail, profileScore } = await request.json();

    // Validate required fields
    if (!jobId || !employeeEmail || !profileScore) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Get employee details
    const employee = await User.findOne({ email: employeeEmail });
    if (!employee) {
      return NextResponse.json(
        { message: "Employee not found" },
        { status: 404 }
      );
    }

    // Check if job exists
    const job = await jobs.findById(jobId);
    if (!job) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    // Check if already applied
    const existingApplication = await jobApplication.findOne({
      jobId,
      employeeId: employee._id,
    });

    if (existingApplication) {
      return NextResponse.json(
        { message: "You have already applied for this job" },
        { status: 400 }
      );
    }

    // Create new application
    const newApplication = new jobApplication({
      jobId,
      employeeId: employee._id,
      employeeEmail,
      profileScore,
    });

    await newApplication.save();

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
