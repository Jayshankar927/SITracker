import Job from "../models/Job.js";


export const createJob = async (req, res) => {
    try {
        // req.user comes from your 'protect' middleware!
        const newJob = new Job({
            ...req.body,
            createdBy: req.user._id 
        });
        const savedJob = await newJob.save();
        res.status(201).json(savedJob);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getJobs = async (req, res) => {
    try {
        // Only find jobs created by THIS specific user
        const jobs = await Job.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Delete job
export const deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: "Job not found" });
        
        // Ensure the user deleting the job actually owns it!
        if (job.createdBy.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        await job.deleteOne();
        res.json({ message: "Job removed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};