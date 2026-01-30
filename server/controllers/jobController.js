import Job from "../models/Job.js";


//create a new job
export const createJob = async (req, res) => {
    try{
        const newJob = new Job(req.body);
        const savedJob = await newJob.save();
        res.status(201).json(savedJob);
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

//get all jobs
export const getJobs = async (req, res) => {
    try{
        const jobs = await Job.find().sort({createdAt: -1}); // Newest first
        res.status(200).json(jobs);
    } catch(error){
        res.status(500).json({message: error.message});
    }
};

//Delete job
export const deleteJob = async (req, res) => {
    try {
        await Job.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Job deleted successfully"});
    } catch(error) {
        res.status(500).json({message: error.message});
    }
};