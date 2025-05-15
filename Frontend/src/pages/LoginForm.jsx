import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from "../../actions/loginAction";

function Login() {
    const [form, setForm] = useState({
        user_name: '',
        password: ''
    });

    const dispatch = useDispatch();
    const { loading, user, error } = useSelector((state) => state.userLogin);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(form));
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="user_name"
                    placeholder="User name"
                    value={form.user_name}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                </form>

                {/* Optional feedback */}
                {error && <p className="text-red-500 mt-4">{error}</p>}
                {user && <p className="text-green-600 mt-4">Welcome, {user.user_name}!</p>}
            </div>
            </div>

    );
}

export default Login;
