import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    company: {type: String, required: true},
    position: {type: String, required: true},
    status: {
        type: String,
        enum: ['Pending', 'Interviewing', 'Accepted', 'Rejected'],
        default: 'Pending'
    },
    interviewDate: {type: Date},
    notes: {type: String},
    createdBy :{ type: mongoose.Schema.Types.ObjectId, ref: 'User'} //For Auth later
},{timestamps: true});

export default mongoose.model('Job', jobSchema);