import { useEffect, useState } from "react";
import axios from 'axios';
import JobForm from "./components/JObForm.jsx";
import { Trash2, Search, LogOut } from 'lucide-react';

function App() {
  const [jobs, setJobs] = useState([]);
  const [userName, setUserName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // 1. Unified Fetch Logic
  const fetchJobs = async () => {
    try {
      const storedUser = localStorage.getItem('userInfo');
      if (!storedUser) {
        window.location.href = '/login';
        return;
      }

      const { token } = JSON.parse(storedUser);
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const res = await axios.get('http://localhost:5000/api/jobs', config);
      setJobs(res.data);
    } catch (err) {
      console.error("Fetch error:", err.response?.data || err.message);
      if (err.response?.status === 401) handleLogout();
    }
  };

  // 2. Initialize App (Auth check & Data fetch)
  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      const { name } = JSON.parse(storedUser);
      setUserName(name);
      fetchJobs();
    } else {
      window.location.href = '/login';
    }
  }, []);

  // 3. Action Handlers
  const handleJobAdded = (newJob) => {
    setJobs([newJob, ...jobs]);
  };

  const deleteJob = async (id) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };

        await axios.delete(`http://localhost:5000/api/jobs/${id}`, config);
        setJobs(jobs.filter((job) => job._id !== id));
      } catch (err) {
        console.error("Delete error:", err.response?.data?.message || err.message);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    window.location.href = '/login';
  };

  // 4. Search Filter Logic
  const filteredJobs = jobs.filter(job =>
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 text-slate-800">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Smart Interview Tracker <span className="animate-pulse">🚀</span>
            </h1>
            <p className="text-slate-500 font-medium">Welcome back, <span className="text-blue-600">{userName}</span>! 👋</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white text-red-500 hover:bg-red-50 px-5 py-2.5 rounded-xl font-bold transition-all border border-red-100 shadow-sm"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-blue-500">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Apps</p>
            <h3 className="text-4xl font-black text-slate-800 mt-1">{jobs.length}</h3>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-yellow-500">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Interviews</p>
            <h3 className="text-4xl font-black text-slate-800 mt-1">
              {jobs.filter(j => j.status === 'Interviewing').length}
            </h3>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-green-500">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Accepted</p>
            <h3 className="text-4xl font-black text-slate-800 mt-1">
              {jobs.filter(j => j.status === 'Accepted').length}
            </h3>
          </div>
        </div>

        {/* Form Section */}
        <JobForm onJobAdded={handleJobAdded} />

        {/* Search Bar */}
        <div className="mb-8 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
          <input 
            type="text"
            placeholder="Search by company or role..."
            className="w-full p-4 pl-12 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all bg-white shadow-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.length === 0 ? (
            <div className="col-span-full bg-white rounded-3xl p-12 text-center border-2 border-dashed border-gray-200">
              <p className="text-xl text-gray-400 font-medium">No applications found. Time to apply! 💼</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500">No results found for "{searchTerm}"</p>
            </div>
          ) : (
            filteredJobs.map(job => (
              <div key={job._id} className="bg-white flex flex-col rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all group relative min-h-[220px]">
                
                {/* 1. Header Row: Title & Delete */}
                <div className="p-6 pb-2 flex justify-between items-start">
                  <div className="flex-1 pr-2">
                    <h3 className="font-bold text-xl text-slate-800 leading-tight truncate">{job.company}</h3>
                    <p className="text-blue-600 font-semibold text-xs mt-0.5 uppercase tracking-wider">{job.position}</p>
                  </div>
                  
                  <button 
                    onClick={() => deleteJob(job._id)}
                    className="text-gray-300 hover:text-red-500 transition-colors p-2 bg-gray-50 rounded-lg shrink-0"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="px-6 flex-1">
                  {job.notes ? (
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 h-20 overflow-y-auto custom-scrollbar">
                      <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">
                        {job.notes}
                      </p>
                    </div>
                  ) : (
                    <div className="h-20 flex items-center justify-center border border-dashed border-gray-100 rounded-xl">
                      <p className="text-[10px] text-gray-300 italic">No notes added</p>
                    </div>
                  )}
                </div>

                <div className="p-6 pt-4 flex justify-between items-center mt-auto border-t border-gray-50">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg ${
                    job.status === 'Rejected' ? 'bg-red-50 text-red-600' : 
                    job.status === 'Interviewing' ? 'bg-yellow-50 text-yellow-600' : 
                    job.status === 'Accepted' ? 'bg-green-50 text-green-600' : 
                    'bg-blue-50 text-blue-600'
                  }`}>
                    {job.status}
                  </span>
                  <span className="text-[11px] font-bold text-gray-400">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </span>
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