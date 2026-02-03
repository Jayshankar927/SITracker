import { useEffect, useState } from "react";
import axios from 'axios';
import JobForm from "./components/JObForm.jsx";

function App(){

  const [jobs, setJobs] = useState([]);

  //This calls the backend
  const fetchJobs = async () => {
    try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        
        if (!userInfo) {
            navigate('/login'); // Redirect if not logged in
            return;
        }

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const res = await axios.get('http://localhost:5000/api/jobs', config);
        setJobs(res.data);
    } catch (err) {
        if (err.response?.status === 401) navigate('/login');
    }
  };

  useEffect(() => {fetchJobs(); }, []);

  const handleJobAdded = (newJob) => {
    setJobs([newJob, ...jobs]); // Add the new job to the top of the list
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-slate-800">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Smart Interview Tracker</h1>
        
        {/* Pass the function as a prop */}
        <JobForm onJobAdded={handleJobAdded} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {jobs.map(job => (
            <div key={job._id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg">{job.company}</h3>
              <p className="text-gray-600">{job.position}</p>
              <span className="text-xs font-semibold mt-2 inline-block px-2 py-1 rounded bg-blue-50 text-blue-600">
                {job.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;