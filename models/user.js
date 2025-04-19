import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  role: { type: String, enum: ['employee', 'recruiter'] }
});

export default mongoose.models.User || mongoose.model('User', userSchema);
