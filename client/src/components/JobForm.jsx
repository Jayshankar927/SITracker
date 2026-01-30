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
            const res = await axios.post('http://localhost:5000/api/jobs', formData);
            console.log("Success:", res.data); // See if data comes back
            onJobAdded(res.data);
            setFormData({ company: '', position: '', status: 'Pending', notes: '' });
        } catch(err){
            // This will tell you if it's a 400, 500, or Network Error
            console.error("Error details:", err.response ? err.response.data : err.message);
        }
    }

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <input 
                placeholder="Company"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company:e.target.value})}
                required
            />
            <input 
                placeholder="Position"
                value={formData.position}
                onChange={(e) => setFormData({...formData, position:e.target.value})}
                required
            />
            <select 
                value={formData.status}
                onChange={(e) => setFormData({...formData, status:e.target.value})}
            >
                <option value="Pending">Pending</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Rejected">Rejected</option>
            </select>
            <button type="submit">Add Apllication</button>
        </form>
    );
}

const styles = {
  form: { display: 'flex', gap: '10px', marginBottom: '20px' }
};

export default JobForm;