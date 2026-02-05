import { useState } from "react";
import axios from "axios";

const JobForm = ({ onJobAdded }) => {
    const [formData, setFormData] = useState({
        company: '',
        position: '',
        status: 'Pending',
        notes: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 1. Get the token from localStorage
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            
            if (!userInfo || !userInfo.token) {
                alert("Session expired. Please login again.");
                return;
            }

            // 2. Set up the config with the Bearer token
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            // 3. Send the POST request with the config
            const res = await axios.post('http://localhost:5000/api/jobs', formData, config);
            
            console.log("Success:", res.data);
            onJobAdded(res.data);
            setFormData({ company: '', position: '', status: 'Pending', notes: '' });
            
        } catch (err) {
            console.error("Error adding job:", err.response?.data?.message || err.message);
            alert("Failed to add job. Check console for details.");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 transition-all">
            <div className="flex flex-col space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Input Group */}
                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-gray-400 mb-1 ml-1 uppercase">Company</label>
                        <input 
                            className="p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="e.g. Google"
                            value={formData.company}
                            onChange={(e) => setFormData({...formData, company: e.target.value})}
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-gray-400 mb-1 ml-1 uppercase">Position</label>
                        <input 
                            className="p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="e.g. SDE-1"
                            value={formData.position}
                            onChange={(e) => setFormData({...formData, position: e.target.value})}
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-gray-400 mb-1 ml-1 uppercase">Status</label>
                        <select 
                            className="p-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none appearance-none cursor-pointer"
                            value={formData.status}
                            onChange={(e) => setFormData({...formData, status: e.target.value})}
                        >
                            <option value="Pending">🕒 Pending</option>
                            <option value="Interviewing">🤝 Interviewing</option>
                            <option value="Accepted">🎉 Accepted</option>
                            <option value="Rejected">❌ Rejected</option>
                        </select>
                    </div>

                    <button type="submit" className="self-end bg-blue-600 text-white h-[46px] rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all flex items-center justify-center gap-2">
                        <span>Add Application</span>
                    </button>
                </div>
            </div>
        </form>
    );
}

const styles = {
  form: { display: 'flex', gap: '10px', marginBottom: '20px' }
};

export default JobForm;