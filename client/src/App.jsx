import { useEffect, useState } from "react";
import axios from 'axios';
import JobForm from "./components/JObForm.jsx";

function App(){

  const [jobs, setJobs] = useState([]);

  //This calls the backend
  useEffect(()=>{
    const fetchJobs = async () => {
      try{
        const res = await axios.get('http://localhost:5000/api/jobs');
        setJobs(res.data);
      } catch(err){
        console.log("Error fetching jobs: ", err);
      }
    };
    fetchJobs();
  }, []);

  const handleJobAdded = (newJob) => {
    setJobs([newJob, ...jobs]); // Add the new job to the top of the list
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Smart Interview Tracker</h1>

      <JobForm onJobAdded={handleJobAdded} />

      <div className="job-list">
        {
          jobs.map(job => (
            <div key={job._id} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px', borderRadius: '8px' }}>
              <h3>{job.company}</h3>
              <p><strong>Role:</strong> {job.position}</p>
              <p>Status: <span style={{color: job.status === "Rejected" ? "red" : "green"}}>{job.status}</span></p>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;