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
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
            <input 
                className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Company"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                required
            />
            <input 
                className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Position"
                value={formData.position}
                onChange={(e) => setFormData({...formData, position: e.target.value})}
                required
            />
            <select 
                className="p-2 border rounded-lg bg-white outline-none"
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
            >
                <option value="Pending">Pending</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Rejected">Rejected</option>
            </select>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all">
                Add Application
            </button>
        </form>
    );
}

const styles = {
  form: { display: 'flex', gap: '10px', marginBottom: '20px' }
};

export default JobForm;