import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  role: { type: String, enum: ["employee", "recruiter"] },
  age: Number,
  workExperience: String,
  graduation: Number,
  currentCourse: String,
  workStatus: { type: String, enum: ["intern", "full-time"] },
  profileScore: {
    type: Number,
  },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
