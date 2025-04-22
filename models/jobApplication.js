import mongoose from 'mongoose';

const jobApplicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  employeeEmail: {
    type: String,
    required: true
  },
  profileScore: {
    type: Number,
    required: true
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.JobApplication || mongoose.model('JobApplication', jobApplicationSchema);