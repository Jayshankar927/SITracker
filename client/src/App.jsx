import { useEffect, useState } from "react";
import axios from 'axios';
import JobForm from "./components/JObForm.jsx";

function App(){

  const [jobs, setJobs] = useState([]);
  const [userName, setUserName] = useState("");

  //This calls the backend
  const fetchJobs = async () => {
    try {
        const storedUser = localStorage.getItem('userInfo');
        if (!storedUser) {
            window.location.href = '/login'; // Redirect if no user found
            return;
        }

        const { token } = JSON.parse(storedUser);

        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Crucial: Space after 'Bearer'
            },
        };

        const res = await axios.get('http://localhost:5000/api/jobs', config);
        setJobs(res.data);
    } catch (err) {
        console.error("Fetch error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {fetchJobs(); }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
        const { name } = JSON.parse(storedUser);
        setUserName(name);
    }
    fetchJobs(); 
  }, []);

  const handleJobAdded = (newJob) => {
    setJobs([newJob, ...jobs]); // Add the new job to the top of the list
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    window.location.href = '/login'; // Hard refresh to clear state
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-slate-800">
      <div className="max-w-6xl mx-auto">
        {/* Navigation Bar Area */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Smart Interview Tracker 🚀</h1>
          <h2 className="text-3xl font-bold">Welcome back, {userName}! 👋</h2>
          <button 
            onClick={handleLogout}
            className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg font-medium transition-colors border border-red-200"
          >
            Logout
          </button>
        </div>
        {/* Pass the function as a prop */}
        <JobForm onJobAdded={handleJobAdded} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {jobs.length === 0 ? (
            <p className="col-span-full text-center text-gray-500 py-10">No applications found. Time to apply! 💼</p>
          ) : (
            jobs.map(job => (
              <div key={job._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-xl text-slate-800">{job.company}</h3>
                  
                  {/* Dynamic Badge Colors */}
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    job.status === 'Rejected' ? 'bg-red-100 text-red-600' : 
                    job.status === 'Interviewing' ? 'bg-yellow-100 text-yellow-600' : 
                    job.status === 'Accepted' ? 'bg-green-100 text-green-600' : 
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {job.status}
                  </span>
                </div>
                
                <p className="text-gray-600 font-medium">{job.position}</p>
                
                <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center text-sm text-gray-400">
                  <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                  {/* We will add a Delete button here next! */}
                </div>
              </div>
              ))
              )}
          </div>
      </div>
    </div>
  );
}

export default App;