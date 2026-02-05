import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Hit the registration endpoint
            const res = await axios.post('https://smart-interview-tracker-oebc.onrender.com/api/auth/register', formData);
            
            // On success, the backend returns the user object + token
            localStorage.setItem('userInfo', JSON.stringify(res.data));
            
            // Redirect to dashboard
            navigate('/'); 
        } catch (err) {
            alert(err.response?.data?.message || "Registration Failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
                <div className="flex flex-col items-center mb-6">
                    <div className="bg-blue-100 p-3 rounded-full mb-4">
                        <UserPlus className="text-blue-600" size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
                    <p className="text-gray-500 text-sm">Start tracking your career moves</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input 
                            type="text" required placeholder="John Doe"
                            className="w-full p-2.5 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            onChange={(e) => setFormData({...formData, name: e.target.value})} 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input 
                            type="email" required placeholder="name@company.com"
                            className="w-full p-2.5 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            onChange={(e) => setFormData({...formData, email: e.target.value})} 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input 
                            type="password" required placeholder="••••••••"
                            className="w-full p-2.5 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            onChange={(e) => setFormData({...formData, password: e.target.value})} 
                        />
                    </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold mt-6 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all">
                    Register
                </button>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account? <Link to="/login" className="text-blue-600 font-semibold hover:underline">Login here</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;