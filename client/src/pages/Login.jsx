import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', formData);
            // Save user data and token to localStorage
            localStorage.setItem('userInfo', JSON.stringify(res.data));
            navigate('/'); // Send user to dashboard
        } catch (err) {
            alert(err.response?.data?.message || "Login Failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login to Tracker</h2>
                <input 
                    type="email" placeholder="Email" className="w-full p-2 mb-4 border rounded"
                    onChange={(e) => setFormData({...formData, email: e.target.value})} 
                />
                <input 
                    type="password" placeholder="Password" className="w-full p-2 mb-4 border rounded"
                    onChange={(e) => setFormData({...formData, password: e.target.value})} 
                />
                <button className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700">
                    Login
                </button>
                <p className="mt-4 text-center text-sm">
                    No account? <Link to="/register" className="text-blue-600">Register here</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;