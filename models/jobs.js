import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  recruiterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "Draft",
  },
  minimumProfileScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  applicationsCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Job || mongoose.model("Job", jobSchema);
